import {Renderer} from "@k8slens/extensions";

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
        sections: CISSection[];
    }

}
