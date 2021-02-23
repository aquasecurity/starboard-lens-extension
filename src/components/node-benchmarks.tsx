import React from "react";
import {Component} from "@k8slens/extensions";
import {cisKubeBenchReportsStore} from "../ciskubebench-reports-store";
import {CISKubeBenchReportDetails} from "./ciskubebench-report-details";

export class NodeBenchmarks extends React.Component<Component.KubeObjectDetailsProps> {

    render() {
        const {object: node} = this.props;

        const report = cisKubeBenchReportsStore.getByName(node.getName())

        return (
            <div>
                <Component.DrawerTitle title="CIS Kubernetes Benchmarks"/>
                <CISKubeBenchReportDetails object={report}/>
            </div>
        )
    }
}
