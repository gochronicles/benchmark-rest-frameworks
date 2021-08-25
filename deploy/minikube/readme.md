<!--
 Copyright (c) 2021 Go Chronicles
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

### Instructions to setup Pulumi on Minikube cluster

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
pulumi config set isMinikube true # required for minikube setup
pulumi config set dockerUsername <username>
pulumi config set --secret dockerPassword <secret-password>
pulumi up # build docker image on local and push to GCR, then deploy on minikube cluster
pulumi destroy # teardown everything (GCR image won't be deleted) 
```

- Expose services
```bash
kubectl get deployments
kubectl expose deployment <deployment name> --type=LoadBalancer --port=3000
kubectl get services # to get list of clusterIP and port
```