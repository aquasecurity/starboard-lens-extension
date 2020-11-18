import {Component, LensRendererExtension} from "@k8slens/extensions";
import React from "react";
import {configAuditReportsStore} from "../configaudit-report-store";
import {ConfigAuditReport} from "../configaudit-report";

enum sortBy {
    name = "name",
    namespace = "namespace",
    danger = "danger",
    warning = "warning",
}

export class ConfigAuditReportPage extends React.Component<{ extension: LensRendererExtension }> {

    async componentDidMount() {
        await configAuditReportsStore.loadAll()
    }

    render() {
        return (
            <Component.KubeObjectListLayout
                className="ConfigAuditReports" store={configAuditReportsStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ConfigAuditReport) => report.getName(),
                    [sortBy.namespace]: (report: ConfigAuditReport) => report.metadata.namespace,
                    [sortBy.danger]: (report: ConfigAuditReport) => report.report.summary.dangerCount,
                    [sortBy.warning]: (report: ConfigAuditReport) => report.report.summary.warningCount,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
                    {title: "Scanner", className: "scanner"},
                    {title: "Danger", className: "danger", sortBy: sortBy.danger},
                    {title: "Warning", className: "xwarning", sortBy: sortBy.warning},
                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    report.getName(),
                    report.metadata.namespace,
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.dangerCount,
                    report.report.summary.warningCount,
                ]}
            />
        )
    }
}
