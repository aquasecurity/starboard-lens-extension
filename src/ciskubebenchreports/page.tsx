import {Renderer} from "@k8slens/extensions";
import React from "react";
import {store} from "./store";
import {CISKubeBenchReport} from "./types";

enum sortBy {
    name = "name",
    fail = "fail",
    info = "info",
    pass = "pass",
    warn = "warn",
}

export class CISKubeBenchReportsPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <Renderer.Component.KubeObjectListLayout
                tableId="kubeBenchReportsTable"
                className="CISKubeBenchReportsList" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: CISKubeBenchReport) => report.getName(),
                    [sortBy.fail]: (report: CISKubeBenchReport) => report.report.summary.failCount,
                    [sortBy.info]: (report: CISKubeBenchReport) => report.report.summary.infoCount,
                    [sortBy.pass]: (report: CISKubeBenchReport) => report.report.summary.passCount,
                    [sortBy.warn]: (report: CISKubeBenchReport) => report.report.summary.warnCount,
                }}
                searchFilters={[
                    (report: CISKubeBenchReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="CISKubeBenchReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Scanner", className: "scanner"},
                    {title: "Fail", className: "fail", sortBy: sortBy.fail},
                    {title: "Warn", className: "pass", sortBy: sortBy.warn},
                    {title: "Info", className: "xinfo", sortBy: sortBy.info},
                    {title: "Pass", className: "pass", sortBy: sortBy.pass},

                ]}
                renderTableContents={(report: CISKubeBenchReport) => [
                    report.getName(),
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.failCount,
                    report.report.summary.warnCount,
                    report.report.summary.infoCount,
                    report.report.summary.passCount,
                ]}
            />
        )
    }
}
