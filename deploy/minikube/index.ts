// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { deploy } from "./k8s";

// Export outputs
// Service - "rest-net-http-golang"
const { deployment: netHttpDeployment, service: netHttpService, ip: netHttpIP } = deploy("rest-net-http-golang");
export const netHttpIngressIP = netHttpIP;
export const netHttp = netHttpService.metadata.name;
export const netHttpDeploy = netHttpDeployment.metadata.name;

// Service - "rest-fastapi-python"
const { deployment: fastapiDeployment, service: fastapiService, ip: fastapiIP } = deploy("rest-fastapi-python");
export const fastapiIngressIP = fastapiIP;
export const fastapi = fastapiService.metadata.name;
export const fastapiDeploy = fastapiDeployment.metadata.name;

// Service - "rest-express-nodejs"
const { deployment: expressDeployment, service: expressService, ip: expressIP } = deploy("rest-express-nodejs");
export const expressIngressIP = expressIP;
export const express = expressService.metadata.name;
export const expressDeploy = expressDeployment.metadata.name;

// Service - "rest-nest-nodejs"
const { deployment: nestDeployment, service: nestService, ip: nestIP } = deploy("rest-nest-nodejs");
export const nestIngressIP = nestIP;
export const nest = nestService.metadata.name;
export const nestDeploy = nestDeployment.metadata.name;

// Service - "rest-fiber-golang"
const { deployment: fiberDeployment, service: fiberService, ip: fiberIP } = deploy("rest-fiber-golang");
export const fiberIngressIP = fiberIP;
export const fiber = fiberService.metadata.name;
export const fiberDeploy = fiberDeployment.metadata.name;

// Service - "rest-gin-golang"
const { deployment: ginDeployment, service: ginService, ip: ginIP } = deploy("rest-gin-golang");
export const ginIngressIP = ginIP;
export const gin = ginService.metadata.name;
export const ginDeploy = ginDeployment.metadata.name;
