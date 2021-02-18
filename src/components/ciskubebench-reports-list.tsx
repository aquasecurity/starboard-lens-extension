import {Component, LensRendererExtension} from "@k8slens/extensions";
import React from "react";
import {cisKubeBenchReportsStore} from "../ciskubebench-reports-store";
import {CISKubeBenchReport} from "../ciskubebench-report";

enum sortBy {
    name = "name",
    fail = "fail",
    info = "info",
    pass = "pass",
    warn = "warn",
}

export class CISKubeBenchReportsList extends React.Component<{ extension: LensRendererExtension }> {

    render() {
        return (
            <Component.KubeObjectListLayout
                isClusterScoped={true}
                className="CISKubeBenchReportsList" store={cisKubeBenchReportsStore}
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
