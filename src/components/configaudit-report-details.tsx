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
                <Component.DrawerItem name="Created">
                    {report.getAge(true, false)} ago ({report.metadata.creationTimestamp})
                </Component.DrawerItem>
            </div>
        )
    }
}
