import {K8sApi} from "@k8slens/extensions";

export class Check {
    checkID: string;
    message: string;
    success: boolean;
    severity: string;
    category: string
}

export class ConfigAuditReport extends K8sApi.KubeObject {
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

    report: {
        scanner: {
            name: string;
            vendor: string;
            version: string;
        }
        summary: {
            dangerCount: number;
            warningCount: number;
        }
        podChecks: Check[]
        containerChecks: {
            [key: string]: Check[]
        }
    }
}
