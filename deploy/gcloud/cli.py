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
MACHINE_TYPE = os.getenv("MACHINE_TYPE", "e2-medium")
NUM_NODES = os.getenv("NUM_NODES", 2)
MIN_NODES = os.getenv("MIN_NODES", 0)
MAX_NODES = os.getenv("MAX_NODES", 3)
ZONE = os.getenv("ZONE", "us-central1-b")

clusterCreate = f"""
gcloud container clusters create \
  --machine-type {MACHINE_TYPE} \
  --num-nodes {NUM_NODES} \
  --zone {ZONE} \
  --cluster-version latest \
  {CLUSTER_NAME}
"""

k8sAdminRole = f"""kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole=cluster-admin \
  --user={GOOGLE_EMAIL_ACCOUNT}
  """
createUserPool = f"""gcloud beta container node-pools create user-pool \
  --machine-type {MACHINE_TYPE} \
  --num-nodes 0 \
  --enable-autoscaling \
  --min-nodes {MIN_NODES} \
  --max-nodes {MAX_NODES} \
  --node-labels hub.jupyter.org/node-purpose=user \
  --node-taints hub.jupyter.org_dedicated=user:NoSchedule \
  --zone {ZONE} \
  --cluster {CLUSTER_NAME}"""

cli = dict(clusterCreate=clusterCreate, k8sAdminRole=k8sAdminRole, createUserPool=createUserPool)


if __name__ == "__main__":
  option = sys.argv[-1]
  cmd = cli.get(option)
  if cmd is not None:
    pprint(f"Option = {option}")
    pprint(f"Command preview = {cmd}")
    answer = input("Do you want to run this? (yes/no)").lower()
    if answer == "yes":
      print("Running the above command!")
      os.system(cmd)
    else:
      print("Exiting without action!")
  else:
    pprint("Invalid selection - choose from clusterCreate, k8sAdminRole or createUserPool!")