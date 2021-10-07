import {Renderer} from "@k8slens/extensions";

export class Vulnerability {
    vulnerability: string;
    severity: string;
    category: string;
    avd_reference: string;

    constructor(params: Vulnerability) {
        Object.entries(params).forEach(([key, value]) => {
            Object.assign(this, {[key]: value})
        });
    }

    getId() {
        return this.vulnerability
    }

    getName() {
        return this.vulnerability
    }
}

export class KubeHunterReport extends Renderer.K8sApi.KubeObject {
    static kind = "KubeHunterReport"
    static namespaced = false
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/kubehunterreports"

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
            highCount: number;
            mediumCount: number;
            lowCount: number;
            unknownCount: number;
        }
        vulnerabilities: Vulnerability[];
    }

}
