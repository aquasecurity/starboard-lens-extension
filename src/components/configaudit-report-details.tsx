import {Component} from "@k8slens/extensions";
import React from "react";
import {ConfigAuditReport} from "../configaudit-report";

export interface ConfigAuditReportDetailsProps extends Component.KubeObjectDetailsProps<ConfigAuditReport> {
}

export class ConfigAuditReportDetails extends React.Component<ConfigAuditReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        if (!report) return null;
        return (
            <div className="ConfigAuditReport">
                <Component.KubeObjectMeta object={report} hideFields={["uid", "resourceVersion", "selfLink"]}/>
                <Component.DrawerItem name="Danger">
                    {report.report.summary.dangerCount}
                </Component.DrawerItem>
                <Component.DrawerItem name="Warning">
                    {report.report.summary.warningCount}
                </Component.DrawerItem>
            </div>
        )
    }
}
