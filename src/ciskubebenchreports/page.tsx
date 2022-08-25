import "./page.scss"
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {store} from "./store";
import {CISKubeBenchReport} from "./types";
import formatDuration from "../utils/formatDuration";

const {
    Component: {
        KubeObjectListLayout,
        Badge
    }
} = Renderer;

enum sortBy {
    name = "name",
    summary = "summary",
    age = "age",
}

export class CISKubeBenchReportsPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <KubeObjectListLayout
                tableId="kubeBenchReportsTable"
                className="CISKubeBenchReportsList" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: CISKubeBenchReport) => report.getName(),
                    [sortBy.summary]: (report: CISKubeBenchReport) => [
                        report.report.summary.failCount,
                        report.report.summary.infoCount,
                        report.report.summary.passCount,
                        report.report.summary.warnCount,
                    ],
                    [sortBy.age]: (report: CISKubeBenchReport) => report.metadata.creationTimestamp,
                }}
                searchFilters={[
                    (report: CISKubeBenchReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="CISKubeBenchReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Summary", className: "summary", sortBy: sortBy.summary},
                    {title: "Scanner", className: "scanner"},
                    {title: "Age", className: "age", sortBy: sortBy.age},
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
                    renderAge(report.metadata.creationTimestamp),
                ]}
            />
        )
    }
}

function renderResult(result: string, count: number) {
    if (count > 0) {
        return (
            <Badge className={"Badge theme-" + result} key="result" small label={count} tooltip={result + ": " + count}/>
        )
    } else {
        return (
            <Badge className="Badge" key="result" small label={count}/>
        )
    }
}

function renderAge(timestamp: string) {
    const creationTimestamp = new Date(timestamp).getTime();
    return (
        <Badge flat expandable={false} key="age"
            label={formatDuration(Date.now() - creationTimestamp, true)}
            tooltip={timestamp} />
    )
}