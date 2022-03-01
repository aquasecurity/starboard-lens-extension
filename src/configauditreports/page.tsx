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
    pass = "pass",
    danger = "danger",
    warning = "warning",
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
                    [sortBy.danger]: (report: ClusterConfigAuditReport) => report.report.summary.dangerCount,
                    [sortBy.warning]: (report: ClusterConfigAuditReport) => report.report.summary.warningCount,
                    [sortBy.pass]: (report: ClusterConfigAuditReport) => report.report.summary.passCount,
                    [sortBy.scanner]: (report: ClusterConfigAuditReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ClusterConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ClusterConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Danger", sortBy: sortBy.danger},
                    {title: "Warning", sortBy: sortBy.warning},
                    {title: "Pass", sortBy: sortBy.pass},
                    {title: "Scanner", sortBy: sortBy.scanner},
                ]}
                renderTableContents={(report: ClusterConfigAuditReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                           tooltip={report.getName()}/>,
                    report.report.summary.dangerCount,
                    report.report.summary.warningCount,
                    report.report.summary.passCount,
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
                    [sortBy.danger]: (report: ConfigAuditReport) => report.report.summary.dangerCount,
                    [sortBy.warning]: (report: ConfigAuditReport) => report.report.summary.warningCount,
                    [sortBy.pass]: (report: ConfigAuditReport) => report.report.summary.passCount,
                    [sortBy.scanner]: (report: ClusterConfigAuditReport) => report.report.scanner.name + " " + report.report.scanner.version,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Namespace", sortBy: sortBy.namespace},
                    {title: "Danger", sortBy: sortBy.danger},
                    {title: "Warning", sortBy: sortBy.warning},
                    {title: "Pass", sortBy: sortBy.pass},
                    {title: "Scanner", sortBy: sortBy.scanner},

                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    <Badge flat expandable={false} key="name" label={report.getName()}
                           tooltip={report.getName()}/>,
                    report.metadata.namespace,
                    report.report.summary.dangerCount,
                    report.report.summary.warningCount,
                    report.report.summary.passCount,
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}
