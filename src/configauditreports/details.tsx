import "./details.scss";
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {Check, ClusterConfigAuditReport, ConfigAuditReport} from "./types";
import {ChecksList} from "./checks-list";

const {
    Component: {
        KubeObjectMeta,
        DrawerItem,
        Badge,
    }
} = Renderer;

export interface ClusterConfigAuditReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<ClusterConfigAuditReport> {
    showObjectMeta?: boolean
}

export class ClusterConfigAuditReportDetails extends React.Component<ClusterConfigAuditReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        const {report: {checks: items}} = report;

        const checks = items.map((check: Check) => new Check(check))

        if (!report) return null;
        const summary = report.report.summary;
        return (
            <div className="ConfigAuditReportDetails">
                {this.props.showObjectMeta &&
                    <KubeObjectMeta
                        object={report}
                        hideFields={["uid", "resourceVersion", "selfLink"]}/>}
                <DrawerItem name="Summary" className="summary" labelsOnly>
                    <Badge className="Badge severity-critical"
                           label={summary.criticalCount}
                           tooltip="Critical"/>
                    <Badge className="Badge severity-high"
                           label={summary.highCount}
                           tooltip="High"/>
                    <Badge className="Badge severity-medium"
                           label={summary.mediumCount}
                           tooltip="Medium"/>
                    <Badge className="Badge severity-low"
                           label={summary.lowCount}
                           tooltip="Low"/>
                </DrawerItem>
                <ChecksList checks={checks}/>
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
        const {report: {checks: items}} = report;

        const checks = items.map((check: Check) => new Check(check))

        if (!report) return null;
        const summary = report.report.summary;
        return (
            <div className="ConfigAuditReportDetails">
                {this.props.showObjectMeta &&
                    <KubeObjectMeta
                        object={report}
                        hideFields={["uid", "resourceVersion", "selfLink"]}/>}
                <DrawerItem name="Summary" className="summary" labelsOnly>
                    <Badge className="Badge severity-critical"
                           label={summary.criticalCount}
                           tooltip="Critical"/>
                    <Badge className="Badge severity-high"
                           label={summary.highCount}
                           tooltip="High"/>
                    <Badge className="Badge severity-medium"
                           label={summary.mediumCount}
                           tooltip="Medium"/>
                    <Badge className="Badge severity-low"
                           label={summary.lowCount}
                           tooltip="Low"/>
                </DrawerItem>
                <ChecksList checks={checks}/>
            </div>
        )
    }
}
