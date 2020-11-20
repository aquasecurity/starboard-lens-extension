import {K8sApi} from "@k8slens/extensions";
import {CISKubeBenchReport} from "./ciskubebench-report";

export class CISKubeBenchReportsApi extends K8sApi.KubeApi<CISKubeBenchReport> {
}

export const cisKubeBenchReportsApi = new CISKubeBenchReportsApi({
    objectConstructor: CISKubeBenchReport
});

export class CISKubeBenchReportsStore extends K8sApi.KubeObjectStore<CISKubeBenchReport> {
    api = cisKubeBenchReportsApi
}

export const cisKubeBenchReportsStore = new CISKubeBenchReportsStore();

K8sApi.apiManager.registerStore(cisKubeBenchReportsStore);
