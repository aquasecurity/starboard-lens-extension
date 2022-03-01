import {Renderer} from "@k8slens/extensions";
import React from "react";
import {clusterStore, store} from "./store";
import {ClusterConfigAuditReport, ConfigAuditReport} from "./types";

const {
    Component: {
        KubeObjectListLayout,
        Badge,
    }
} = Renderer;

enum sortBy {
    name = "name",
    namespace = "namespace",
    critical = "critical",
    high = "high",
    medium = "medium",
    low = "low",
    scanner = "scanner"
}

export class ClusterConfigAuditReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="ClusterConfigAuditReportsTable"
                className="ConfigAuditReports" store={clusterStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ClusterConfigAuditReport) => report.getName(),
                    [sortBy.critical]: (report: ClusterConfigAuditReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: ClusterConfigAuditReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: ClusterConfigAuditReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: ClusterConfigAuditReport) => report.report.summary.lowCount,
                    [sortBy.scanner]: (report: ClusterConfigAuditReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ClusterConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ClusterConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Critical", sortBy: sortBy.critical},
                    {title: "High", sortBy: sortBy.high},
                    {title: "Medium", sortBy: sortBy.medium},
                    {title: "Low", sortBy: sortBy.low},
                    {title: "Scanner", sortBy: sortBy.scanner},
                ]}
                renderTableContents={(report: ClusterConfigAuditReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                           tooltip={report.getName()}/>,
                    report.report.summary.criticalCount,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}

export class ConfigAuditReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="ConfigAuditReportsTable"
                className="ConfigAuditReports" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: ConfigAuditReport) => report.getName(),
                    [sortBy.namespace]: (report: ConfigAuditReport) => report.metadata.namespace,
                    [sortBy.critical]: (report: ConfigAuditReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: ConfigAuditReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: ConfigAuditReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: ConfigAuditReport) => report.report.summary.lowCount,
                    [sortBy.scanner]: (report: ClusterConfigAuditReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Namespace", sortBy: sortBy.namespace},
                    {title: "Critical", sortBy: sortBy.critical},
                    {title: "High", sortBy: sortBy.high},
                    {title: "Medium", sortBy: sortBy.medium},
                    {title: "Low", sortBy: sortBy.low},
                    {title: "Scanner", sortBy: sortBy.scanner},

                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                           tooltip={report.getName()}/>,
                    report.metadata.namespace,
                    report.report.summary.criticalCount,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}
