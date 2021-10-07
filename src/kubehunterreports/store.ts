import {Renderer} from "@k8slens/extensions";
import {KubeHunterReport} from "./types";

export class Api extends Renderer.K8sApi.KubeApi<KubeHunterReport> {
}

export class Store extends Renderer.K8sApi.KubeObjectStore<KubeHunterReport> {
    api = new Api({
        objectConstructor: KubeHunterReport
    })
}

export const store = new Store();

Renderer.K8sApi.apiManager.registerStore(store);
