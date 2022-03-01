import {Renderer} from "@k8slens/extensions";
import React from "react"
import {ClusterVulnerabilityReportPage, VulnerabilityReportPage} from "./src/vulnerabilityreports/page";
import {ClusterVulnerabilityReport, VulnerabilityReport} from "./src/vulnerabilityreports/types";
import {
    ClusterVulnerabilityReportDetails,
    ClusterVulnerabilityReportDetailsProps,
    VulnerabilityReportDetails,
    VulnerabilityReportDetailsProps
} from "./src/vulnerabilityreports/details";
import {STARBOARD_API_VERSION} from "./src/starboard/constants";
import {ClusterConfigAuditReport, ConfigAuditReport} from "./src/configauditreports/types";
import {ClusterConfigAuditReportPage, ConfigAuditReportPage} from "./src/configauditreports/page";
import {
    ClusterConfigAuditReportDetails,
    ClusterConfigAuditReportDetailsProps,
    ConfigAuditReportDetails,
    ConfigAuditReportDetailsProps
} from "./src/configauditreports/details";
import {KubeHunterReportsPage} from "./src/kubehunterreports/page";
import {KubeHunterReport} from "./src/kubehunterreports/types";
import {KubeHunterReportDetails, KubeHunterReportDetailsProps} from "./src/kubehunterreports/details";
import {CISKubeBenchReportsPage} from "./src/ciskubebenchreports/page";
import {CISKubeBenchReport} from "./src/ciskubebenchreports/types";
import {NodeBenchmarks} from "./src/ciskubebenchreports/node-benchmarks";
import {CISKubeBenchReportDetails, CISKubeBenchReportDetailsProps} from "./src/ciskubebenchreports/details";
import {WorkloadConfigAuditReports} from "./src/workloads/configauditreports";
import {WorkloadVulnerabilityReports} from "./src/workloads/vulnerabilityreports";

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
            id: "clustervulnerabilityreports",
            components: {
                Page: () => <ClusterVulnerabilityReportPage extension={this}/>
            }
        },
        {
            id: "clusterconfigauditreports",
            components: {
                Page: () => <ClusterConfigAuditReportPage extension={this}/>,
            }
        },
        {
            id: "ciskubebenchreports",
            components: {
                Page: () => <CISKubeBenchReportsPage extension={this}/>
            }
        },
        {
            id: "kubehunterreports",
            components: {
                Page: () => <KubeHunterReportsPage extension={this}/>
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
            target: {pageId: "clustervulnerabilityreports"},
            title: "ClusterVulnerabilityReports",
            components: {
                Icon: CertificateIcon
            }
        },
        {
            parentId: "starboard",
            target: {pageId: "clusterconfigauditreports"},
            title: "ClusterConfigAuditReports",
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
        },
        {
            parentId: "starboard",
            target: {pageId: "kubehunterreports"},
            title: "KubeHunterReports",
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
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
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
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
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
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
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
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
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
                        <WorkloadConfigAuditReports {...props} />
                        <WorkloadVulnerabilityReports {...props}/>
                    </React.Fragment>
            }
        },
        {
            kind: VulnerabilityReport.kind,
            apiVersions: [STARBOARD_API_VERSION],
            components: {
                Details: (props: VulnerabilityReportDetailsProps) => <VulnerabilityReportDetails
                    showObjectMeta={true} {...props} />
            }
        },
        {
            kind: ClusterVulnerabilityReport.kind,
            apiVersions: [STARBOARD_API_VERSION],
            components: {
                Details: (props: ClusterVulnerabilityReportDetailsProps) => <ClusterVulnerabilityReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: ConfigAuditReport.kind,
            apiVersions: [STARBOARD_API_VERSION],
            components: {
                Details: (props: ConfigAuditReportDetailsProps) => <ConfigAuditReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: ClusterConfigAuditReport.kind,
            apiVersions: [STARBOARD_API_VERSION],
            components: {
                Details: (props: ClusterConfigAuditReportDetailsProps) => <ClusterConfigAuditReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: CISKubeBenchReport.kind,
            apiVersions: [STARBOARD_API_VERSION],
            components: {
                Details: (props: CISKubeBenchReportDetailsProps) => <CISKubeBenchReportDetails
                    showObjectMeta {...props} />
            }
        },
        {
            kind: KubeHunterReport.kind,
            apiVersions: [STARBOARD_API_VERSION],
            components: {
                Details: (props: KubeHunterReportDetailsProps) => <KubeHunterReportDetails
                    showObjectMeta {...props} />
            }
        },
    ]

}
