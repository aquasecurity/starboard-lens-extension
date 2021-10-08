import {Renderer} from "@k8slens/extensions";
import {CISKubeBenchReport} from "./types";

export class Api extends Renderer.K8sApi.KubeApi<CISKubeBenchReport> {
}

export class Store extends Renderer.K8sApi.KubeObjectStore<CISKubeBenchReport> {
    api = new Api({
        objectConstructor: CISKubeBenchReport
    })
}

export const store = new Store();

Renderer.K8sApi.apiManager.registerStore(store);
