import {Component, LensRendererExtension} from "@k8slens/extensions";
import React from "react"
import {StarboardFeature} from "./src/starboard-feature"
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

export function CertificateIcon(props: Component.IconProps) {
    return <Component.Icon {...props} material="security"/>
}

export default class StarboardExtension extends LensRendererExtension {

    clusterFeatures = [
        {
            title: "Starboard",
            components: {
                Description: () => {
                    return (
                        <span>
                            Enable Kubernetes-native security (Starboard toolkit) for your cluster.
                            Install only if Starboard has not been initialized yet.
                            The install command will create Kubernetes resources used by Starboard.
                        </span>
                    )
                }
            },
            feature: new StarboardFeature()
        }
    ]

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
            kind: 'Pod',
            apiVersions: ['v1'],
            priority: 10,
            components: {
                Details: (props: Component.KubeObjectDetailsProps) =>
                    <WorkloadVulnerabilities {...props} />
            }
        },
        {
            kind: "Deployment",
            apiVersions: ["apps/v1"],
            priority: 10,
            components: {
                Details: (props: Component.KubeObjectDetailsProps) =>
                    <WorkloadVulnerabilities {...props} />
            }
        },
        {
            kind: 'DaemonSet',
            apiVersions: ['apps/v1'],
            priority: 10,
            components: {
                Details: (props: Component.KubeObjectDetailsProps) =>
                    <WorkloadVulnerabilities {...props} />
            }
        },
        {
            kind: 'StatefulSet',
            apiVersions: ['apps/v1'],
            priority: 10,
            components: {
                Details: (props: Component.KubeObjectDetailsProps) =>
                    <WorkloadVulnerabilities {...props} />
            }
        },
        {
            kind: "ReplicaSet",
            apiVersions: ["apps/v1"],
            priority: 10,
            components: {
                Details: (props: Component.KubeObjectDetailsProps) =>
                    <WorkloadVulnerabilities {...props} />
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
                Details: (props: ConfigAuditReportDetailsProps) => <ConfigAuditReportDetails {...props} />
            }
        },
        {
            kind: CISKubeBenchReport.kind,
            apiVersions: ["aquasecurity.github.io/v1alpha1"],
            components: {
                Details: (props: CISKubeBenchReportDetailsProps) => <CISKubeBenchReportDetails {...props} />
            }
        }
    ]

}
