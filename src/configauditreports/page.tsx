import {Renderer} from "@k8slens/extensions";
import React from "react";
import {clusterStore, store} from "./store";
import {ClusterConfigAuditReport, ConfigAuditReport} from "./types";

enum sortBy {
    name = "name",
    namespace = "namespace",
    critical = "critical",
    high = "high",
    medium = "medium",
    low = "low",
}

export class ClusterConfigAuditReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <Renderer.Component.KubeObjectListLayout
                tableId="ClusterConfigAuditReportsTable"
                className="ConfigAuditReports" store={clusterStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ClusterConfigAuditReport) => report.getName(),
                    [sortBy.critical]: (report: ClusterConfigAuditReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: ClusterConfigAuditReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: ClusterConfigAuditReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: ClusterConfigAuditReport) => report.report.summary.lowCount,
                }}
                searchFilters={[
                    (report: ClusterConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ClusterConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Scanner"},
                    {title: "Critical", sortBy: sortBy.critical},
                    {title: "High", sortBy: sortBy.high},
                    {title: "Medium", sortBy: sortBy.medium},
                    {title: "Low", sortBy: sortBy.low},
                ]}
                renderTableContents={(report: ClusterConfigAuditReport) => [
                    report.getName(),
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.criticalCount,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                ]}
            />
        )
    }
}

export class ConfigAuditReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <Renderer.Component.KubeObjectListLayout
                tableId="ConfigAuditReportsTable"
                className="ConfigAuditReports" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: ConfigAuditReport) => report.getName(),
                    [sortBy.namespace]: (report: ConfigAuditReport) => report.metadata.namespace,
                    [sortBy.critical]: (report: ConfigAuditReport) => report.report.summary.criticalCount,
                    [sortBy.high]: (report: ConfigAuditReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: ConfigAuditReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: ConfigAuditReport) => report.report.summary.lowCount,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Namespace", sortBy: sortBy.namespace},
                    {title: "Scanner",},
                    {title: "Critical", sortBy: sortBy.critical},
                    {title: "High", sortBy: sortBy.high},
                    {title: "Medium", sortBy: sortBy.medium},
                    {title: "Low", sortBy: sortBy.low},
                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    report.getName(),
                    report.metadata.namespace,
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.criticalCount,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                ]}
            />
        )
    }
}
