import "./configaudit-report-details.scss";
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {ClusterConfigAuditReport, ConfigAuditReport} from "../configaudit-report";
import {ConfigAuditChecksList} from "./configaudit-checks-list";

export interface ClusterConfigAuditReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterConfigAuditReport> {
    showObjectMeta?: boolean
}

export class ClusterConfigAuditReportDetails extends React.Component<ClusterConfigAuditReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        if (!report) return null;
        const summary = report.report.summary;
        return (
            <div className="ConfigAuditReportDetails">
                {this.props.showObjectMeta &&
                <Renderer.Component.KubeObjectMeta
                    object={report}
                    hideFields={["uid", "resourceVersion", "selfLink"]}/>}
                <Renderer.Component.DrawerItem name="Summary" className="summary" labelsOnly>
                    <Renderer.Component.Badge
                        className="Badge theme-danger"
                        label={summary.dangerCount}
                        tooltip="Danger"/>
                    <Renderer.Component.Badge
                        className="Badge theme-warning"
                        label={summary.warningCount}
                        tooltip="Warning"/>
                    <Renderer.Component.Badge
                        className="Badge theme-pass"
                        label={summary.passCount}
                        tooltip="Pass"/>
                </Renderer.Component.DrawerItem>

                <ConfigAuditChecksList
                    podChecks={report.report.podChecks}
                    containerChecks={report.report.containerChecks}/>
            </div>
        )
    }
}

export interface ConfigAuditReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ConfigAuditReport> {

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
        const summary = report.report.summary;
        return (
            <div className="ConfigAuditReportDetails">
                {this.props.showObjectMeta &&
                <Renderer.Component.KubeObjectMeta
                    object={report}
                    hideFields={["uid", "resourceVersion", "selfLink"]}/>}
                <Renderer.Component.DrawerItem name="Summary" className="summary" labelsOnly>
                    <Renderer.Component.Badge
                        className="Badge theme-danger"
                        label={summary.dangerCount}
                        tooltip="Danger"/>
                    <Renderer.Component.Badge
                        className="Badge theme-warning"
                        label={summary.warningCount}
                        tooltip="Warning"/>
                    <Renderer.Component.Badge
                        className="Badge theme-pass"
                        label={summary.passCount}
                        tooltip="Pass"/>
                </Renderer.Component.DrawerItem>

                <ConfigAuditChecksList
                    podChecks={report.report.podChecks}
                    containerChecks={report.report.containerChecks}/>
            </div>
        )
    }
}
