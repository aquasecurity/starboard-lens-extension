import {Renderer} from "@k8slens/extensions";
import {Scanner} from "../starboard/types";

export class Check {
    checkID: string;
    title: string;
    description: string;
    message: string;
    success: boolean;
    severity: string;
    category: string
}

export class Summary {
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
}

export class ClusterConfigAuditReport extends Renderer.K8sApi.KubeObject {
    static kind = "ClusterConfigAuditReport"
    static namespaced = false
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/clusterconfigauditreports"

    kind: string
    apiVersion: string

    metadata: {
        name: string;
        namespace: string;
        selfLink: string;
        uid: string;
        resourceVersion: string;
        creationTimestamp: string;
        labels: {
            [key: string]: string;
        };
        annotations: {
            [key: string]: string;
        };
    }

    report: ConfigAuditReportData;

}

export class ConfigAuditReport extends Renderer.K8sApi.KubeObject {
    static kind = "ConfigAuditReport"
    static namespaced = true
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/configauditreports"

    kind: string
    apiVersion: string
    metadata: {
        name: string;
        namespace: string;
        selfLink: string;
        uid: string;
        resourceVersion: string;
        creationTimestamp: string;
        labels: {
            [key: string]: string;
        };
        annotations: {
            [key: string]: string;
        };
    }

    report: ConfigAuditReportData;
}

export type ConfigAuditReportData = {
    scanner: Scanner
    summary: Summary
    checks: Check[]
}
