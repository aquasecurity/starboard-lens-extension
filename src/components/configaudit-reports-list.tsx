import {Renderer} from "@k8slens/extensions";
import React from "react";
import {configAuditReportsStore} from "../configaudit-reports-store";
import {ConfigAuditReport} from "../configaudit-report";

enum sortBy {
    name = "name",
    namespace = "namespace",
    pass = "pass",
    danger = "danger",
    warning = "warning",
}

export class ConfigAuditReportPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <Renderer.Component.KubeObjectListLayout
                tableId="configAuditReportsTable"
                className="ConfigAuditReports" store={configAuditReportsStore}
                sortingCallbacks={{
                    [sortBy.name]: (report: ConfigAuditReport) => report.getName(),
                    [sortBy.namespace]: (report: ConfigAuditReport) => report.metadata.namespace,
                    [sortBy.pass]: (report: ConfigAuditReport) => report.report.summary.passCount,
                    [sortBy.danger]: (report: ConfigAuditReport) => report.report.summary.dangerCount,
                    [sortBy.warning]: (report: ConfigAuditReport) => report.report.summary.warningCount,
                }}
                searchFilters={[
                    (report: ConfigAuditReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="ConfigAuditReports"
                renderTableHeader={[
                    {title: "Name", sortBy: sortBy.name},
                    {title: "Namespace", sortBy: sortBy.namespace},
                    {title: "Scanner",},
                    {title: "Pass", sortBy: sortBy.pass},
                    {title: "Danger", sortBy: sortBy.danger},
                    {title: "Warning", sortBy: sortBy.warning},
                ]}
                renderTableContents={(report: ConfigAuditReport) => [
                    report.getName(),
                    report.metadata.namespace,
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.passCount,
                    report.report.summary.dangerCount,
                    report.report.summary.warningCount,
                ]}
            />
        )
    }
}
