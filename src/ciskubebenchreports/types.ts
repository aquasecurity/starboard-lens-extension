import {Renderer} from "@k8slens/extensions";
import {Scanner} from "../starboard/types";

export class CISSection {
    id: string;
    version: string;
    text: string;
    tests: CISTest[];
}

export class CISTest {
    section: string;
    desc: string;
    results: CISResult[];
}

export class CISResult {
    test_number: string;
    test_desc: string;
    remediation: string;
    status: string;
    scored: boolean;
}

export class CISKubeBenchReport extends Renderer.K8sApi.KubeObject {

    static kind = "CISKubeBenchReport"
    static namespaced = false
    static apiBase = "/apis/aquasecurity.github.io/v1alpha1/ciskubebenchreports"

    report: {
        scanner: Scanner
        summary: {
            failCount: number;
            infoCount: number;
            passCount: number;
            warnCount: number;
        },
        sections: CISSection[];
    }

}
