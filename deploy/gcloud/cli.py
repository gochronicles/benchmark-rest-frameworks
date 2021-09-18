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
NUM_NODES = os.getenv("NUM_NODES", 1)
MIN_NODES = os.getenv("MIN_NODES", 0)
MAX_NODES = os.getenv("MAX_NODES", 5)
ZONE = os.getenv("ZONE", "us-central1-b")


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

cleanup = f"gcloud container clusters delete {CLUSTER_NAME} --zone={ZONE}"
cli = dict(createCluster=createCluster, k8sAdminRole=k8sAdminRole, cleanup=cleanup)


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
    pprint("Invalid selection - choose from createCluster, k8sAdminRole or cleanup!")