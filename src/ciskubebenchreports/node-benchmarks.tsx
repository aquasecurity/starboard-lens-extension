import React from "react";
import {Renderer} from "@k8slens/extensions";
import {cisKubeBenchReportsStore} from "../ciskubebenchreports/store";
import {CISKubeBenchReportDetails} from "../ciskubebenchreports/details";

export class NodeBenchmarks extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: node} = this.props;

        const report = cisKubeBenchReportsStore.getByName(node.getName())

        return (
            <div>
                <Renderer.Component.DrawerTitle title="CIS Kubernetes Benchmarks"/>
                <CISKubeBenchReportDetails object={report}/>
            </div>
        )
    }
}
