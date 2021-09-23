<!--
 Copyright (c) 2021 Nikhil Akki

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

## Run instructions -

```bash
# Setup Env variables
export GOOGLE_EMAIL_ACCOUNT=<string> # required; example - myemail@gmail.com

export CLUSTER_NAME=<string> # optional; defaults to "benchmark-cluster"
export MACHINE_TYPE=<string> # optional; defaults to "n1-standard-2"
export NUM_NODES=<int> # optional; defaults to 1
export MIN_NODES=<int> # optional; defaults to 0
export MAX_NODES=<int> # optional; defaults to 5
export ZONE=<string> # optional; defaults to "us-central1-b"

# CLI interface
./cli.py createCluster # creates K8s cluster, make sure you login to gcloud account via cli
./cli.py k8sAdminRole # create admin role for K8s
./cli.py cleanup # delete cluster
```

> To confirm check the GCP console/Kubernetes section for cluster
> details/deletion status.

> **Warning - If you fail to delete/cleanup the K8s cluster YOU WILL BE CHARGED
> BY GCP!**
