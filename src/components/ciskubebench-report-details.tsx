import {Renderer} from "@k8slens/extensions";
import React from "react";
import {CISKubeBenchReport} from "../ciskubebench-report";
import {CISSectionsList} from "./cissections-list";

export interface CISKubeBenchReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<CISKubeBenchReport> {
    showObjectMeta?: boolean
}

export class CISKubeBenchReportDetails extends React.Component<CISKubeBenchReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        if (!report) return null;
        return (
            <div className="CISKubeBenchReport">
                {this.props.showObjectMeta &&
                <Renderer.Component.KubeObjectMeta object={report} hideFields={["uid", "resourceVersion", "selfLink"]}/>}
                <Renderer.Component.DrawerItem name="Fail">
                    {report.report.summary.failCount}
                </Renderer.Component.DrawerItem>
                <Renderer.Component.DrawerItem name="Warn">
                    {report.report.summary.warnCount}
                </Renderer.Component.DrawerItem>
                <Renderer.Component.DrawerItem name="Info">
                    {report.report.summary.infoCount}
                </Renderer.Component.DrawerItem>
                <Renderer.Component.DrawerItem name="Pass">
                    {report.report.summary.passCount}
                </Renderer.Component.DrawerItem>

                <CISSectionsList sections={report.report.sections}/>

            </div>
        )
    }
}
