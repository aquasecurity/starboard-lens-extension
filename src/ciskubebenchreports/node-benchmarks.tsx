import React from "react";
import {Renderer} from "@k8slens/extensions";
import {store} from "./store";
import {CISKubeBenchReportDetails} from "./details";

export class NodeBenchmarks extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: node} = this.props;

        const report = store.getByName(node.getName())

        return (
            <div>
                <Renderer.Component.DrawerTitle title="CIS Kubernetes Benchmarks"/>
                <CISKubeBenchReportDetails object={report}/>
            </div>
        )
    }
}
