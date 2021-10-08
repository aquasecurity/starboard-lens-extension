import {Renderer} from "@k8slens/extensions";
import {CISKubeBenchReport} from "./types";

export class CISKubeBenchReportsApi extends Renderer.K8sApi.KubeApi<CISKubeBenchReport> {
}

export const cisKubeBenchReportsApi = new CISKubeBenchReportsApi({
    objectConstructor: CISKubeBenchReport
});

export class CISKubeBenchReportsStore extends Renderer.K8sApi.KubeObjectStore<CISKubeBenchReport> {
    api = cisKubeBenchReportsApi
}

export const cisKubeBenchReportsStore = new CISKubeBenchReportsStore();

Renderer.K8sApi.apiManager.registerStore(cisKubeBenchReportsStore);
