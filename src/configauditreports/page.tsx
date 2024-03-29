import "./page.scss"
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
    summary = "summary",
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
                    [sortBy.summary]: (report: ClusterConfigAuditReport) => [
                        report.report.summary.criticalCount,
                        report.report.summary.highCount,
                        report.report.summary.mediumCount,
                        report.report.summary.lowCount
                    ],
                    [sortBy.scanner]: (report: ClusterConfigAuditReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ClusterConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ClusterConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Summary", className: "summary", sortBy: sortBy.summary},
                    {title: "Scanner", sortBy: sortBy.scanner},
                ]}
                renderTableContents={(report: ClusterConfigAuditReport) => [
                    renderName(report.getName()),
                    [
                        renderSeverity("CRITICAL", report.report.summary.criticalCount),
                        renderSeverity("HIGH", report.report.summary.highCount),
                        renderSeverity("MEDIUM", report.report.summary.mediumCount),
                        renderSeverity("LOW", report.report.summary.lowCount),
                    ],
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
                    [sortBy.summary]: (report: ConfigAuditReport) => [
                        report.report.summary.criticalCount,
                        report.report.summary.highCount,
                        report.report.summary.mediumCount,
                        report.report.summary.lowCount
                    ],
                    [sortBy.scanner]: (report: ConfigAuditReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
                    {title: "Summary", className: "summary", sortBy: sortBy.summary},
                    {title: "Scanner", className: "scanner", sortBy: sortBy.scanner},
                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    renderName(report.getName()),
                    report.metadata.namespace,
                    [
                        renderSeverity("CRITICAL", report.report.summary.criticalCount),
                        renderSeverity("HIGH", report.report.summary.highCount),
                        renderSeverity("MEDIUM", report.report.summary.mediumCount),
                        renderSeverity("LOW", report.report.summary.lowCount),
                    ],
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}

function renderName(name: string) {
  return (
      <Badge flat expandable={false} key="name" label={name} tooltip={name}/>
  )
}

function renderSeverity(severity: string, count: number) {
    if (count > 0) {
        return (
            <Badge className={"Badge severity-" + severity} key="severity" small label={count} tooltip={severity + ": " + count}/>
        )
    } else {
        return (
            <Badge className="Badge" key="severity" small label={count}/>
        )
    }
}