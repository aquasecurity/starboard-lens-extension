import "./page.scss"
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {store} from "./store";
import {CISKubeBenchReport} from "./types";

const {
    Component: {
        KubeObjectListLayout,
        Badge
    }
} = Renderer;

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
            <KubeObjectListLayout
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
                    {title: "Fail", className: "fail", sortBy: sortBy.fail},
                    {title: "Warn", className: "pass", sortBy: sortBy.warn},
                    {title: "Info", className: "xinfo", sortBy: sortBy.info},
                    {title: "Pass", className: "pass", sortBy: sortBy.pass},
                    {title: "Scanner", className: "scanner"},
                ]}
                renderTableContents={(report: CISKubeBenchReport) => [
                    report.getName(),
                    renderResult("fail", report.report.summary.failCount),
                    renderResult("warn", report.report.summary.warnCount),
                    renderResult("info", report.report.summary.infoCount),
                    renderResult("pass", report.report.summary.passCount),
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}

function renderResult(result: string, count: number) {
  if (count > 0) {
    return (
        <Badge className={"Badge theme-" + result} small key="result" label={count}/>
    )
  } else {
    return (
        <Badge small key="result" label={count}/>
    )
  } 
}