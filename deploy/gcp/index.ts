// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import createCluster from "./cluster";
import pushImage from "./gcr";
import { createDeployment, createService } from "./gke";


const { kubeconfig, clusterName, clusterProvider, namespaceName } = createCluster();
export const kubeConfig = kubeconfig;
export const clustername = clusterName;

const nethttpGo = "rest-net-http-golang";
const imagenameNethttp = pushImage(nethttpGo);
export const imageNameNethttp = imagenameNethttp.apply(name => "" + name);
const nethttpDeployment = createDeployment(nethttpGo, namespaceName, imagenameNethttp, clusterProvider, 1, 3000);
const nethttpService = createService(nethttpGo, namespaceName, clusterProvider);
export const deploymentName = nethttpDeployment.metadata.name;
export const serviceNethttp = nethttpService.metadata.name;
export const nethttpServicePublicIP = nethttpService.status.loadBalancer.ingress[0].ip;


const fiber = "rest-fiber-golang";
const imagenameFiber = pushImage(fiber);
export const imageNameFiber = imagenameFiber.apply(name => "" + name);
const fiberDeployment = createDeployment(fiber, namespaceName, imagenameFiber, clusterProvider, 1, 3000);
const fiberService = createService(fiber, namespaceName, clusterProvider);
export const deploymentFiber = fiberDeployment.metadata.name;
export const serviceFiber = nethttpService.metadata.name;
export const fiberServicePublicIP = fiberService.status.loadBalancer.ingress[0].ip;

const gin = "rest-gin-golang";
const imagenameGin = pushImage(gin);
export const imageNameGin = imagenameGin.apply(name => "" + name);
const ginDeployment = createDeployment(gin, namespaceName, imagenameGin, clusterProvider, 1, 3000);
const ginService = createService(gin, namespaceName, clusterProvider);
export const deploymentGin = ginDeployment.metadata.name;
export const serviceGin = nethttpService.metadata.name;
export const fginServicePublicIP = ginService.status.loadBalancer.ingress[0].ip;

const express = "rest-express-nodejs";
const imagenameExpress = pushImage(express);
export const imageNameExpress = imagenameExpress.apply(name => "" + name);
const expressDeployment = createDeployment(express, namespaceName, imagenameExpress, clusterProvider, 1, 3000);
const expressService = createService(express, namespaceName, clusterProvider);
export const deploymentExpress = expressDeployment.metadata.name;
export const serviceExpress = nethttpService.metadata.name;
export const expressServicePublicIP = expressService.status.loadBalancer.ingress[0].ip;

const nest = "rest-nest-nodejs";
const imagenameNest = pushImage(nest);
export const imageNameNest = imagenameNest.apply(name => "" + name);
const nestDeployment = createDeployment(nest, namespaceName, imagenameNest, clusterProvider, 1, 3000);
const nestService = createService(nest, namespaceName, clusterProvider);
export const deploymentNest = nestDeployment.metadata.name;
export const serviceNest = nethttpService.metadata.name;
export const nestServicePublicIP = nestService.status.loadBalancer.ingress[0].ip;

const fastapi = "rest-fastapi-python";
const imagenameFastapi = pushImage(fastapi);
export const imageNameFastapi = imagenameFastapi.apply(name => "" + name);
const fastapiDeployment = createDeployment(fastapi, namespaceName, imagenameFastapi, clusterProvider, 1, 3000);
const fastapiService = createService(fastapi, namespaceName, clusterProvider);
export const deploymentFastapi = fastapiDeployment.metadata.name;
export const serviceFastapi = nethttpService.metadata.name;
export const fastapiServicePublicIP = fastapiService.status.loadBalancer.ingress[0].ip;
