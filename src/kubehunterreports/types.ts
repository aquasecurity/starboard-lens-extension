import {Renderer} from "@k8slens/extensions";
import {Scanner} from "../starboard/types";

export class Vulnerability {
    vulnerability: string;
    severity: string;
    description: string;
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

    report: {
        scanner: Scanner;
        summary: {
            highCount: number;
            mediumCount: number;
            lowCount: number;
            unknownCount: number;
        }
        vulnerabilities: Vulnerability[];
    }

}
