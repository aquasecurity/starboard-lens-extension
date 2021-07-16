import {Renderer} from "@k8slens/extensions";
import React from "react";
import {clusterConfigAuditReportsStore, configAuditReportsStore} from "../configaudit-reports-store";
import {ClusterConfigAuditReport, ConfigAuditReport} from "../configaudit-report";

enum sortBy {
    name = "name",
    namespace = "namespace",
    pass = "pass",
    danger = "danger",
    warning = "warning",
}

export class ClusterConfigAuditReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <Renderer.Component.KubeObjectListLayout
                tableId="ClusterConfigAuditReportsTable"
                className="ConfigAuditReports" store={clusterConfigAuditReportsStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ClusterConfigAuditReport) => report.getName(),
                    [sortBy.danger]: (report: ClusterConfigAuditReport) => report.report.summary.dangerCount,
                    [sortBy.warning]: (report: ClusterConfigAuditReport) => report.report.summary.warningCount,
                    [sortBy.pass]: (report: ClusterConfigAuditReport) => report.report.summary.passCount,
                }}
                searchFilters={[
                    (report: ClusterConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ClusterConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Scanner",},
                    {title: "Danger", sortBy: sortBy.danger},
                    {title: "Warning", sortBy: sortBy.warning},
                    {title: "Pass", sortBy: sortBy.pass},
                ]}
                renderTableContents={(report: ClusterConfigAuditReport) => [
                    report.getName(),
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.dangerCount,
                    report.report.summary.warningCount,
                    report.report.summary.passCount,
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
                className="ConfigAuditReports" store={configAuditReportsStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ConfigAuditReport) => report.getName(),
                    [sortBy.namespace]: (report: ConfigAuditReport) => report.metadata.namespace,
                    [sortBy.danger]: (report: ConfigAuditReport) => report.report.summary.dangerCount,
                    [sortBy.warning]: (report: ConfigAuditReport) => report.report.summary.warningCount,
                    [sortBy.pass]: (report: ConfigAuditReport) => report.report.summary.passCount,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Namespace", sortBy: sortBy.namespace},
                    {title: "Scanner",},
                    {title: "Danger", sortBy: sortBy.danger},
                    {title: "Warning", sortBy: sortBy.warning},
                    {title: "Pass", sortBy: sortBy.pass},
                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    report.getName(),
                    report.metadata.namespace,
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.dangerCount,
                    report.report.summary.warningCount,
                    report.report.summary.passCount,
                ]}
            />
        )
    }
}
