import {Component} from "@k8slens/extensions";
import React from "react";
import {ConfigAuditReport} from "../configaudit-report";
import {ConfigAuditChecksList} from "./configaudit-checks-list";

export interface ConfigAuditReportDetailsProps extends Component.KubeObjectDetailsProps<ConfigAuditReport> {

    /*
     * Determines whether to display ObjectMeta section or not.
     * We want to display it in the generic ConfigAuditReport view.
     * However, we want to hide it when we show ConfigAuditReport
     * in the WorkloadConfigAudit details pane.
     */
    showObjectMeta?: boolean
}

export class ConfigAuditReportDetails extends React.Component<ConfigAuditReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        if (!report) return null;
        return (
            <div className="ConfigAuditReport">
                {this.props.showObjectMeta &&
                <Component.KubeObjectMeta object={report} hideFields={["uid", "resourceVersion", "selfLink"]}/>}

                <Component.DrawerItem name="Danger">
                    {report.report.summary.dangerCount}
                </Component.DrawerItem>
                <Component.DrawerItem name="Warning">
                    {report.report.summary.warningCount}
                </Component.DrawerItem>

                <ConfigAuditChecksList
                    podChecks={report.report.podChecks}
                    containerChecks={report.report.containerChecks}/>
            </div>
        )
    }
}
