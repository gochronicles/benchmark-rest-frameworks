// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";


function createDeployment(name: string, namespaceName: pulumi.Output<string>, imageName: pulumi.Output<string>, clusterProvider: k8s.Provider, replicas: number, containerPort: number) {
    // Create a NGINX Deployment
    const appLabels = { appClass: name };
    const deployment = new k8s.apps.v1.Deployment(name,
        {
            metadata: {
                namespace: namespaceName,
                labels: appLabels,
            },
            spec: {
                replicas: replicas,
                selector: { matchLabels: appLabels },
                template: {
                    metadata: {
                        labels: appLabels,
                    },
                    spec: {
                        containers: [
                            {
                                name: name,
                                image: imageName,
                                ports: [{ name: "http", containerPort: containerPort }],
                                resources: {
                                    requests: {
                                        memory: "128Mi",
                                        cpu: "80m"
                                    },
                                    limits: {
                                        memory: "256Mi",
                                        cpu: "200m"
                                    }
                                }
                            }],
                    }
                },
            },
        },
        {
            provider: clusterProvider,
        },
    );
    return deployment;
}


function createService(name: string, namespaceName: pulumi.Output<string>, clusterProvider: k8s.Provider) {
    const appLabels = { appClass: name };
    // Create a LoadBalancer Service for the NGINX Deployment
    const service = new k8s.core.v1.Service(name,
        {
            metadata: {
                labels: appLabels,
                namespace: namespaceName,
            },
            spec: {
                type: "LoadBalancer",
                ports: [{ port: 80, targetPort: "http" }],
                selector: appLabels,
            },
        },
        {
            provider: clusterProvider,
        },
    );
    return service;
}

export { createDeployment, createService }
