import {K8sApi} from "@k8slens/extensions";

export class CISKubeBenchReport extends K8sApi.KubeObject {

    static kind = "CISKubeBenchReport"
    static namespaced = false
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/ciskubebenchreports"

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
            failCount: number;
            infoCount: number;
            passCount: number;
            warnCount: number;
        },
    }

}
