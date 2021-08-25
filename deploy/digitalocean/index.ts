import * as pulumi from "@pulumi/pulumi";
import { createCluster, createDeployment } from "./k8s";
import { getImageRegistry, createImage } from "./container";

// Enable some configurable parameters.
const config = new pulumi.Config();
const nodeCount = config.getNumber("nodeCount") || 3;
const appReplicaCount = config.getNumber("appReplicaCount") || 5;
// Create K8s Cluster
const { provider, kubeconfig } = createCluster("do-cluster", nodeCount);


function deploy(name: string) {
    const build = "../../" + name;
    const { imageName, registryInfo } = getImageRegistry(name);
    const image = createImage(name, build, imageName, registryInfo);
    const { deployment, service } = createDeployment(name, appReplicaCount, provider, image.imageName, 3000);
    return { deployment, service };

};
// Export outputs
export const kubeConfig = kubeconfig;
// Service - "rest-net-http-golang"
const { deployment: httpGoDeploy, service: httpGoservice } = deploy("rest-net-http-golang");
export const httpGDeploymentName = httpGoDeploy.metadata.name;
export const httpGIngressIp = httpGoservice.status.loadBalancer.ingress[0].ip;

// "rest-fastapi-python"
const { deployment: fastapiDeploy, service: fastapiService } = deploy("rest-fastapi-python");
export const fastapiDeploymentName = fastapiDeploy.metadata.name;
export const fastapiServiceIngressIp = fastapiService.status.loadBalancer.ingress[0].ip;

// "rest-express-nodejs"
const { deployment: expressDeploy, service: expressService } = deploy("rest-express-nodejs");
export const expressDeploymentName = expressDeploy.metadata.name;
export const expressServiceIngressIp = expressService.status.loadBalancer.ingress[0].ip;

// "rest-nest-nodejs"
const { deployment: nestDeploy, service: nestService } = deploy("rest-nest-nodejs");
export const nestDeploymentName = nestDeploy.metadata.name;
export const nestServiceIngressIp = nestService.status.loadBalancer.ingress[0].ip;

// "rest-fiber-golang"
const { deployment: fiberDeploy, service: fiberService } = deploy("rest-fiber-golang");
export const fiberDeploymentName = fiberDeploy.metadata.name;
export const fiberServiceIngressIp = fiberService.status.loadBalancer.ingress[0].ip;

// "rest-gin-golang"
const { deployment: ginDeploy, service: ginService } = deploy("rest-gin-golang");
export const ginDeploymentName = ginDeploy.metadata.name;
export const ginServiceIngressIp = ginService.status.loadBalancer.ingress[0].ip;
