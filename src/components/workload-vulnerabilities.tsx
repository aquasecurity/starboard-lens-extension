import {Renderer} from "@k8slens/extensions";
import React from "react";
import {vulnerabilityReportsStore} from "../vulnerabilityreports/store";
import {VulnerabilityReportDetails} from "../vulnerabilityreports/details";

// This component is trying to lookup the VulnerabilityReports associated with the
// specified Kubernetes workload and then render those reports.
export class WorkloadVulnerabilities extends React.Component<Renderer.Component.KubeObjectDetailsProps> {

    render() {
        const {object: workload} = this.props;

        const selector = [
            "starboard.resource.kind=" + workload.kind,
            "starboard.resource.name=" + workload.getName(),
            "starboard.resource.namespace=" + workload.getNs()
        ];

        const vulnerabilityReports = vulnerabilityReportsStore.getByLabel(selector)

        return (
            <div>
                <Renderer.Component.DrawerTitle title="VulnerabilityReports"/>
                {vulnerabilityReports.length == 0 && <div>N/A</div>}
                {
                    vulnerabilityReports.map((report) => {
                        return (
                            <VulnerabilityReportDetails object={report} showContainerStatus={true}/>
                        );
                    })
                }
            </div>
        )
    }
}
