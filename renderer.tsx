import {Renderer} from "@k8slens/extensions";
import React from "react"
import {VulnerabilityReportPage} from "./src/components/vulnerability-reports-list";
import {VulnerabilityReport} from "./src/vulnerability-report";
import {
    VulnerabilityReportDetails,
    VulnerabilityReportDetailsProps
} from "./src/components/vulnerability-report-details";
import {ConfigAuditReportPage} from "./src/components/configaudit-reports-list";
import {ConfigAuditReport} from "./src/configaudit-report";
import {ConfigAuditReportDetails, ConfigAuditReportDetailsProps} from "./src/components/configaudit-report-details";
import {CISKubeBenchReportsList} from "./src/components/ciskubebench-reports-list";
import {CISKubeBenchReport} from "./src/ciskubebench-report";
import {CISKubeBenchReportDetails, CISKubeBenchReportDetailsProps} from "./src/components/ciskubebench-report-details";
import {WorkloadVulnerabilities} from "./src/components/workload-vulnerabilities";
import {WorkloadConfigAudit} from "./src/components/workload-configaudit";
import {NodeBenchmarks} from "./src/components/node-benchmarks";

export function CertificateIcon(props: Renderer.Component.IconProps) {
    return <Renderer.Component.Icon {...props} material="security"/>
}

export default class StarboardExtension extends Renderer.LensExtension {

    clusterPages = [
        {
            id: "vulnerabilityreports",
            components: {
                Page: () => <VulnerabilityReportPage extension={this}/>,
            }
        },
        {
            id: "configauditreports",
            components: {
                Page: () => <ConfigAuditReportPage extension={this}/>,
            }
        },
        {
            id: "ciskubebenchreports",
            components: {
                Page: () => <CISKubeBenchReportsList extension={this}/>
            }
        }
    ]

    clusterPageMenus = [
        {
            id: "starboard",
            title: "Starboard",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "starboard",
            target: {pageId: "vulnerabilityreports"},
            title: "VulnerabilityReports",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "starboard",
            target: {pageId: "configauditreports"},
            title: "ConfigAuditReports",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "starboard",
            target: {pageId: "ciskubebenchreports"},
            title: "CISKubeBenchReports",
            components: {
                Icon: CertificateIcon
            }
        }
    ]

    kubeObjectDetailItems = [
        {
            kind: "Node",
            apiVersions: ["v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <NodeBenchmarks {...props} />
                    </React.Fragment>
            }
        },
        {
            kind: "Pod",
            apiVersions: ["v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAudit {...props} />
                        <WorkloadVulnerabilities {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "Deployment",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAudit {...props} />
                        <WorkloadVulnerabilities {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "DaemonSet",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAudit {...props} />
                        <WorkloadVulnerabilities {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "StatefulSet",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAudit {...props} />
                        <WorkloadVulnerabilities {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: "ReplicaSet",
            apiVersions: ["apps/v1"],
            priority: 9,
            components: {
                Details: (props: Renderer.Component.KubeObjectDetailsProps) =>
                    <React.Fragment>
                        <WorkloadConfigAudit {...props} />
                        <WorkloadVulnerabilities {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: VulnerabilityReport.kind,
            apiVersions: ["aquasecurity.github.io/v1alpha1"],
            components: {
                Details: (props: VulnerabilityReportDetailsProps) => <VulnerabilityReportDetails
                    showObjectMeta={true} {...props} />
            }
        },
        {
            kind: ConfigAuditReport.kind,
            apiVersions: ["aquasecurity.github.io/v1alpha1"],
            components: {
                Details: (props: ConfigAuditReportDetailsProps) => <ConfigAuditReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: CISKubeBenchReport.kind,
            apiVersions: ["aquasecurity.github.io/v1alpha1"],
            components: {
                Details: (props: CISKubeBenchReportDetailsProps) => <CISKubeBenchReportDetails
                    showObjectMeta {...props} />
            }
        }
    ]

}
