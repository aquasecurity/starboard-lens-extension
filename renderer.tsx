import {LensRendererExtension} from "@k8slens/extensions";
import {ExampleIcon, StarboardPage} from "./page"
import React from "react"

export default class ExampleExtension extends LensRendererExtension {
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
