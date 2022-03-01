import {Renderer} from "@k8slens/extensions";
import {Scanner} from "../starboard/types";

export type Summary = {
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
}

export class Check {
    checkID: string;
    title: string;
    description: string;
    messages: string[];
    success: boolean;
    severity: string;
    category: string;

    constructor(params: Check) {
        Object.entries(params).forEach(([key, value]) => {
            Object.assign(this, {[key]: value})
        });
    }

    getId() {
        return this.checkID
    }
}

export type ConfigAuditReportData = {
    updateTimestamp: string;
    scanner: Scanner
    summary: Summary
    checks: Check[]
}

export class ClusterConfigAuditReport extends Renderer.K8sApi.KubeObject {
    static kind = "ClusterConfigAuditReport"
    static namespaced = false
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/clusterconfigauditreports"

    report: ConfigAuditReportData

}

export class ConfigAuditReport extends Renderer.K8sApi.KubeObject {
    static kind = "ConfigAuditReport"
    static namespaced = true
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/configauditreports"

    report: ConfigAuditReportData
}
