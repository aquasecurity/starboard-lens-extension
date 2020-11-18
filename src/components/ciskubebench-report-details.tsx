import {Component} from "@k8slens/extensions";
import React from "react";
import {CISKubeBenchReport} from "../ciskubebench-report";
import {CISSectionsList} from "./cissections-list";

export interface CISKubeBenchReportDetailsProps extends Component.KubeObjectDetailsProps<CISKubeBenchReport> {
}

export class CISKubeBenchReportDetails extends React.Component<CISKubeBenchReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        if (!report) return null;
        return (
            <div className="CISKubeBenchReport">
                <Component.KubeObjectMeta object={report} hideFields={["uid", "resourceVersion", "selfLink"]}/>
                <Component.DrawerItem name="Fail">
                    {report.report.summary.failCount}
                </Component.DrawerItem>
                <Component.DrawerItem name="Info">
                    {report.report.summary.infoCount}
                </Component.DrawerItem>
                <Component.DrawerItem name="Pass">
                    {report.report.summary.passCount}
                </Component.DrawerItem>
                <Component.DrawerItem name="Warn">
                    {report.report.summary.warnCount}
                </Component.DrawerItem>

                <CISSectionsList sections={report.report.sections}/>

            </div>
        )
    }
}
