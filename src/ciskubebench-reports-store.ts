import {K8sApi} from "@k8slens/extensions";
import {CISKubeBenchReport} from "./ciskubebench-report";

export class CISKubeBenchReportApi extends K8sApi.KubeApi<CISKubeBenchReport> {
}

export const cisKubeBenchReportApi = new CISKubeBenchReportApi({
    objectConstructor: CISKubeBenchReport
});

export class CISKubeBenchReportsStore extends K8sApi.KubeObjectStore<CISKubeBenchReport> {
    api = cisKubeBenchReportApi
}

export const cisKubeBenchReportsStore = new CISKubeBenchReportsStore();

K8sApi.apiManager.registerStore(cisKubeBenchReportsStore, [cisKubeBenchReportApi]);
