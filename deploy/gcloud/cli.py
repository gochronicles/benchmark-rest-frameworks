#!/usr/bin/python3

# Copyright (c) 2021 Go Chronicles
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT


import os
import sys
from pprint import pprint


CLUSTER_NAME = os.getenv("CLUSTER_NAME", "benchmark-cluster")
GOOGLE_EMAIL_ACCOUNT = os.getenv("GOOGLE_EMAIL_ACCOUNT")
MACHINE_TYPE = os.getenv("MACHINE_TYPE", "n1-standard-2")
NUM_NODES = os.getenv("NUM_NODES", 1)
MIN_NODES = os.getenv("MIN_NODES", 0)
MAX_NODES = os.getenv("MAX_NODES", 3)
ZONE = os.getenv("ZONE", "us-central1-b")
NODE_PORT = os.getenv("NODE_PORT")
VM_NAME = os.getenv("VM_NAME", "benchmark-client")
HEY_URL = os.getenv(
    "HEY_URL", "https://hey-release.s3.us-east-2.amazonaws.com/hey_linux_amd64"
)

createCluster = f"""
gcloud container clusters create \
  --machine-type {MACHINE_TYPE} \
  --num-nodes {NUM_NODES} \
  --enable-autoscaling \
  --min-nodes {MIN_NODES} \
  --max-nodes {MAX_NODES} \
  --zone {ZONE} \
  --cluster-version latest \
  {CLUSTER_NAME}
"""

k8sAdminRole = f"""kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole=cluster-admin \
  --user={GOOGLE_EMAIL_ACCOUNT}
  """


allowNodePort = f"""gcloud compute firewall-rules create allow-node-port --allow=tcp:{NODE_PORT} \
  --description="Allow incoming traffic on TCP port {NODE_PORT}" --direction=INGRESS"""

createClient = f"""gcloud compute instances create {VM_NAME} \
  --zone {ZONE} \
  --image-project=debian-cloud \
  --image-family=debian-10 \
  --machine-type={MACHINE_TYPE} \
  --metadata=startup-script='#! /bin/bash
  apt update
  apt -y install -y htop git apache2-utils
  curl {HEY_URL} -o hey
  chmod +x hey && mv hey /usr/bin/'
"""

ssh = f"""gcloud beta compute ssh --zone {ZONE} {VM_NAME}"""

cleanup = f"""gcloud container clusters delete {CLUSTER_NAME} --zone={ZONE}
gcloud compute instances delete {VM_NAME} --zone={ZONE}
"""

cli = dict(
    createCluster=createCluster,
    k8sAdminRole=k8sAdminRole,
    allowNodePort=allowNodePort,
    createClient=createClient,
    ssh=ssh,
    cleanup=cleanup,
)


if __name__ == "__main__":
    option = sys.argv[-1]
    cmd = cli.get(option)
    if cmd is not None:
        pprint(f"Option = {option}")
        pprint(f"Command preview = {cmd}")
        answer = input("Do you want to run this? (yes/no) ").lower()
        if answer == "yes":
            pprint("Running the above command!")
            os.system(cmd)
        else:
            pprint("Exiting without action!")
    else:
        pprint(
            """Invalid selection - choose from createCluster, k8sAdminRole, 
            allowNodePort, createClient, ssh or cleanup!"""
        )
