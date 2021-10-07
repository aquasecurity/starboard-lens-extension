import React from "react";
import {Renderer} from "@k8slens/extensions";
import {store} from "./store";
import {KubeHunterReport} from "./types";

enum sortBy {
    name = "name",
    high = "high",
    medium = "medium",
    low = "low",
    unknown = "unknown",
}

export class KubeHunterReportsPage extends React.Component<{ extension: Renderer.LensExtension }> {

    render() {
        return (
            <Renderer.Component.KubeObjectListLayout
                tableId="kubeHunterReportsTable"
                className="KubeHunterReportsPage" store={store}
                sortingCallbacks={{
                    [sortBy.name]: (report: KubeHunterReport) => report.getName(),
                    [sortBy.high]: (report: KubeHunterReport) => report.report.summary.highCount,
                    [sortBy.medium]: (report: KubeHunterReport) => report.report.summary.mediumCount,
                    [sortBy.low]: (report: KubeHunterReport) => report.report.summary.lowCount,
                    [sortBy.unknown]: (report: KubeHunterReport) => report.report.summary.unknownCount,
                }}
                searchFilters={[
                    (report: KubeHunterReport) => report.getSearchFields()
                ]}
                renderHeaderTitle="KubeHunterReports"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Scanner", className: "scanner"},
                    {title: "High", className: "fail", sortBy: sortBy.high},
                    {title: "Medium", className: "pass", sortBy: sortBy.medium},
                    {title: "Low", className: "xinfo", sortBy: sortBy.low},
                    {title: "Unknown", className: "pass", sortBy: sortBy.unknown},

                ]}
                renderTableContents={(report: KubeHunterReport) => [
                    report.getName(),
                    report.report.scanner.name + " " + report.report.scanner.version,
                    report.report.summary.highCount,
                    report.report.summary.mediumCount,
                    report.report.summary.lowCount,
                    report.report.summary.unknownCount,
                ]}
            />
        )
    }
}
