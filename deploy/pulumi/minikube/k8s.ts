// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { getImageRegistry, createImage } from "./container"

const config = new pulumi.Config();

function createDeployment(name: string, image: pulumi.Output<string>) {
    // Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
    // running on minikube, and if so, create only services of type ClusterIP.
    const isMinikube = config.requireBoolean("isMinikube");

    const appLabels = { app: name };
    const deployment = new k8s.apps.v1.Deployment(name, {
        spec: {
            selector: { matchLabels: appLabels },
            replicas: 1,
            template: {
                metadata: { labels: appLabels },
                spec: { containers: [{ name: name, image: image }] }
            }
        }
    });

    // Allocate an IP to the Deployment.
    const service = new k8s.core.v1.Service(name, {
        metadata: { labels: deployment.spec.template.metadata.labels },
        spec: {
            type: isMinikube ? "ClusterIP" : "LoadBalancer",
            ports: [{ port: 80, targetPort: 80, protocol: "TCP" }],
            selector: appLabels
        }
    });
    // When "done", this will print the public IP.
    const ip = isMinikube
        ? service.spec.clusterIP
        : service.status.loadBalancer.apply(
            (lb) => lb.ingress[0].ip || lb.ingress[0].hostname
        );
    return { deployment, service, ip };
};

function deploy(name: string) {
    const build = "../../" + name;
    const { imageName, registryInfo } = getImageRegistry(name);
    const image = createImage(name, build, imageName, registryInfo);
    const { deployment, service, ip } = createDeployment(name, image.imageName);
    return { deployment, service, ip };
};
export { createDeployment, deploy };
