// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";


function pushImage(name: string) {
    const image = new docker.Image(name, {
        imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/${name}`,
        build: {
            context: `../../${name}/`,
        },
    });
    return image.imageName;
};

export default pushImage;
