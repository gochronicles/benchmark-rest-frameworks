// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";
import * as digitalocean from "@pulumi/digitalocean";

function createCluster(clusterName: string, nodeCount: number) {

    // Provision a DigitalOcean Kubernetes cluster and export its resulting
    // kubeconfig to make it easy to access from the kubectl command line.
    const cluster = new digitalocean.KubernetesCluster(clusterName, {
        region: digitalocean.Region.NYC3,
        version: digitalocean.getKubernetesVersions().then(p => p.latestVersion),
        nodePool: {
            name: "default",
            size: digitalocean.DropletSlug.DropletS1VCPU2GB,
            nodeCount: nodeCount,
        },
    });

    // The DigitalOcean Kubernetes cluster periodically gets a new certificate,
    // so we look up the cluster by name and get the current kubeconfig after
    // initial provisioning. You'll notice that the `certificate-authority-data`
    // field changes on every `pulumi update`.
    const kubeconfig = cluster.status.apply(status => {
        if (status === "running") {
            const clusterDataSource = cluster.name.apply(name => digitalocean.getKubernetesCluster({ name }));
            return clusterDataSource.kubeConfigs[0].rawConfig;
        } else {
            return cluster.kubeConfigs[0].rawConfig;
        }
    });

    // Now lets actually deploy an application to our new cluster. We begin
    // by creating a new "Provider" object that uses our kubeconfig above,
    // so that any application objects deployed go to our new cluster.
    const provider = new kubernetes.Provider("do-k8s", { kubeconfig });
    return { provider, kubeconfig };
};

// Now create a Kubernetes Deployment using the "nginx" container
// image from the Docker Hub, replicated a number of times, and a
// load balanced Service in front listening for traffic on port 80.
function createDeployment(appName: string, appReplicaCount: number, provider: kubernetes.Provider, imageName: pulumi.Output<string>, containerPort: number) {
    const appLabels = { "app": appName };
    const deploymentName = appName + "-deployment";
    const deployment = new kubernetes.apps.v1.Deployment(deploymentName, {
        spec: {
            selector: { matchLabels: appLabels },
            replicas: appReplicaCount,
            template: {
                metadata: { labels: appLabels },
                spec: {
                    containers: [{
                        name: appName,
                        image: imageName,
                        ports: [{ containerPort: containerPort }],
                        resources: {
                            requests: {
                                memory: "128Mi",
                                cpu: "100m"
                            },
                            limits: {
                                memory: "256Mi",
                                cpu: "200m"
                            }
                        }
                    }],

                },
            },
        },
    }, { provider });
    const serviceName = appName + "-service";
    const service = new kubernetes.core.v1.Service(serviceName, {
        spec: {
            type: "LoadBalancer",
            selector: deployment.spec.template.metadata.labels,
            ports: [{ port: 80, targetPort: containerPort }],
        },
    }, { provider });
    return { deployment, service };
};

export { createCluster, createDeployment };