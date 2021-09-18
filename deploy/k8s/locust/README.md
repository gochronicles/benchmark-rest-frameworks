## Setup instructions

```bash
cd deploy/k8s
k apply -f locust/
```

This will deploy locust load testing tool on to the K8s cluster in master &
worker mode.

> Credits - [mosesliao](https://github.com/mosesliao)

> Adapted from
> _[Original Repo/source](https://github.com/mosesliao/kubernetes-locust.git)_
