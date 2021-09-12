<!--
 Copyright (c) 2021 Go Chronicles

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

### Terraform Infra scripts for deploying all RESTful APIs on GCP

#### **Project setup**

```bash
export PROJECT_ID=<projectid>
export REGION=us-central1
export TERRAFORM_BUCKET_NAME=<bucketname>
echo $PROJECT_ID, $REGION, $TERRAFORM_BUCKET_NAME

### Set default GCP project
gcloud config set project ${PROJECT_ID}

### Login to gcloud console from CLI
gcloud auth application-default login

### Create GCS Bucket for Terraform state files
gsutil mb -c standard -l ${REGION} gs://${TERRAFORM_BUCKET_NAME}
gsutil versioning set on gs://${TERRAFORM_BUCKET_NAME}


### Set project variable in Terraform
export TF_VAR_project=$PROJECT_ID

cd plan
### And finally initialize Terraform backend with GCS bucket
terraform init \
    -backend-config="bucket=${TERRAFORM_BUCKET_NAME}" \
    -backend-config="prefix=state"
```

**Get K8s config for kubectl**

```bash
gcloud container clusters get-credentials benchmark-cluster --zone $REGION
```

**Run k8s yaml configs via kubectl cli**

```bash
cd ../../k8s/
kubectl apply -f k8s/ # deploys all services
```

**SSH into AB tool Client server**

```bash
gcloud compute firewall-rules create allow-ssh-ingress-from-iap \
  --network=<benchmark-cluster-network-name> \
  --direction=INGRESS \
  --action=allow \
  --rules=tcp:22 \
  --source-ranges=35.235.240.0/20

gcloud beta compute ssh \
  --zone "us-central1-a" "benchmark-client" \
  --tunnel-through-iap
```

_These scripts are adapted from
[repo](https://github.com/gruntwork-io/terraform-google-gke)_
