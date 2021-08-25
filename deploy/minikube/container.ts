// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as docker from "@pulumi/docker";
import { ImageRegistry } from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";

// [Placeholder 1: Get registry info (creds and endpoint).]
// Fetch the Docker Hub auth info from config.
const config = new pulumi.Config();
const username = config.require("dockerUsername");
const password = config.requireSecret("dockerPassword");

function getImageRegistry(name: string) {
    // Populate the registry info (creds and endpoint).
    const imageName = `${username}/${name}`;
    const registryInfo = {
        server: "docker.io",
        username: username,
        password: password,
    };
    return { imageName, registryInfo };
};
// [Placeholder 2: Build and publish the container image.]

function createImage(name: string, build: string, imageName: string, registry: pulumi.Input<ImageRegistry>): docker.Image {
    // Build and publish the container image.
    const image = new docker.Image(name, {
        build: build,
        imageName,
        registry,
    });
    return image;
};

export { getImageRegistry, createImage };
