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

export function CertificateIcon(props: Component.IconProps) {
    return <Component.Icon {...props} material="security" tooltip="VulnerabilityReports"/>
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
            path: "/vulnerabilityreports-page",
            title: "Vulnerability Reports",
            components: {
                Page: () => <VulnerabilityReportPage extension={this}/>,
                MenuIcon: CertificateIcon,
            }
        },
        {
            path: "/configauditreports-page",
            title: "ConfigAudit Reports",
            components: {
                Page: () => <ConfigAuditReportPage extension={this}/>,
                MenuIcon: CertificateIcon,
            }
        }
    ]

    kubeObjectDetailItems = [
        {
            kind: VulnerabilityReport.kind,
            apiVersions: ["aquasecurity.github.io/v1alpha1"],
            components: {
                Details: (props: VulnerabilityReportDetailsProps) => <VulnerabilityReportDetails {...props} />
            }
        },
        {
            kind: ConfigAuditReport.kind,
            apiVersions: ["aquasecurity.github.io/v1alpha1"],
            components: {
                Details: (props: ConfigAuditReportDetailsProps) => <ConfigAuditReportDetails {...props} />
            }
        }
    ]
}
