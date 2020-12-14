import React from "react";
import {Component} from "@k8slens/extensions";
import {configAuditReportsStore} from "../configaudit-reports-store";
import {ConfigAuditReportDetails} from "./configaudit-report-details";

/*
 * This component is trying to lookup the ConfigAuditReport associated with the
 * specified Kubernetes workload and then render it.
 */
export class WorkloadConfigAudit extends React.Component<Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "starboard.resource.kind=" + workload.kind,
            "starboard.resource.name=" + workload.getName(),
            "starboard.resource.namespace=" + workload.getNs()
        ];

        const configAuditReports = configAuditReportsStore.getByLabel(selector)

        return (
            <div>
                <Component.DrawerTitle title="ConfigAuditReport"/>
                {configAuditReports.length == 0 && <div>N/A</div>}
                {
                    configAuditReports.map((report) => {
                        return (
                            <ConfigAuditReportDetails object={report}/>
                        );
                    })
                }
            </div>
        )
    }

}
