<!--
 Copyright (c) 2021 Go Chronicles
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Deploy on K8s using Pulumi

## Pre-requisites 

1. docker
1. minikube
1. kubectl
1. pulumi
1. nodejs [version > 14] with TypeScript support
## Run instructions

### Minikube

- Setup minikube
```bash
# terminal window 1
minikube start
minikube dashboard
# terminal window 2
minikube tunnel
# terminal window 3
```
- run pulumi cli

```bash
pulumi stack init minikube
pulumi config set gcp:project <project name>
pulumi config set isMinikube true # required for minikube setup
pulumi up # build docker image on local and push to GCR, then deploy on minikube cluster
pulumi destroy # teardown everything (GCR image won't be deleted) 
```

### GKE

```bash
pulumi stack init gcp-benchmark
pulumi config set gcp:project <project name>
pulumi config set gcp:region us-central1 # or anyother region
pulumi config set gcp:zone us-central1-a # or anyother zone
pulumi config set gke-min-version '1.19' # relevant version
pulumi up # build docker image on local and push to GCR, then deploy on minikube cluster
pulumi stack output kubeConfig --show-secrets > kubeconfig
export KUBECONFIG=$PWD/kubeconfig
export KUBERNETES_VERSION=1.11.6 && sudo curl -s -o /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/v${KUBERNETES_VERSION}/bin/linux/amd64/kubectl && sudo chmod +x /usr/local/bin/kubectl
kubectl get deployment $(pulumi stack output deploymentName) --namespace=$(pulumi stack output namespaceName)
kubectl get service $(pulumi stack output serviceName) --namespace=$(pulumi stack output namespaceName)

pulumi destroy # teardown everything (GCR image won't be deleted) 
```

### Troubleshooting

- If the GCR repo isn't accessible, goto GCP console and from repo settings make it public.