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
    results = "results",
}

export class CISKubeBenchReportsPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="kubeBenchReportsTable"
                className="CISKubeBenchReportsList" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: CISKubeBenchReport) => report.getName(),
                    [sortBy.results]: (report: CISKubeBenchReport) => [
                        report.report.summary.failCount,
                        report.report.summary.infoCount,
                        report.report.summary.passCount,
                        report.report.summary.warnCount,
                    ]
                }}
                searchFilters={[
                    (report: CISKubeBenchReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="CISKubeBenchReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Results", className: "results", sortBy: sortBy.results},
                    {title: "Scanner", className: "scanner"},
                ]}
                renderTableContents={(report: CISKubeBenchReport) => [
                    report.getName(),
                    [
                        renderResult("fail", report.report.summary.failCount),
                        renderResult("warn", report.report.summary.warnCount),
                        renderResult("info", report.report.summary.infoCount),
                        renderResult("pass", report.report.summary.passCount),
                    ],
                    report.report.scanner.name + " " + report.report.scanner.version,
                ]}
            />
        )
    }
}

function renderResult(result: string, count: number) {
    if (count > 0) {
        return (
            <Badge className={"Badge theme-" + result} key="result" label={count} tooltip={result + ": " + count}/>
        )
    } else {
        return (
            <Badge key="result" label={count}/>
        )
    }
}