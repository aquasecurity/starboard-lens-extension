import {LensRendererExtension} from "@k8slens/extensions";
import {ExampleIcon, StarboardPage} from "./page"
import React from "react"
import {StarboardFeature} from "./src/starboard-feature"

export default class StarboardExtension extends LensRendererExtension {
    clusterFeatures = [
        {
            title: "Starboard",
            components: {
                Description: () => {
                    return (
                        <span>
                            Enable Kubernetes-native security (Starboard toolkit) for your cluster.
                            Install only if Starboard has not been initialized yet.
                            The install command will create Kubernetes resources used by Starboard.
                        </span>
                    )
                }
            },
            feature: new StarboardFeature()
        }
    ]
    clusterPages = [
        {
            path: "/extension-starboard",
            title: "Starboard",
            components: {
                Page: () => <StarboardPage extension={this}/>,
                MenuIcon: ExampleIcon,
            }
        }
    ]
}
