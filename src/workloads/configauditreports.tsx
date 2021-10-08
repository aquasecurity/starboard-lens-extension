import React from "react";
import {Renderer} from "@k8slens/extensions";
import {store} from "../configauditreports/store";
import {ConfigAuditReportDetails} from "../configauditreports/details";

/*
 * This component is trying to lookup the ConfigAuditReport associated with the
 * specified Kubernetes workload and then render it.
 */
export class WorkloadConfigAuditReports extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "starboard.resource.kind=" + workload.kind,
            "starboard.resource.name=" + workload.getName(),
            "starboard.resource.namespace=" + workload.getNs()
        ];

        const configAuditReports = store.getByLabel(selector)

        return (
            <div>
                <Renderer.Component.DrawerTitle title="ConfigAuditReport"/>
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
