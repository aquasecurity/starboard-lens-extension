import {Renderer} from "@k8slens/extensions";
import {ClusterConfigAuditReport, ConfigAuditReport} from "./types";

export class ClusterApi extends Renderer.K8sApi.KubeApi<ClusterConfigAuditReport> {
}

export class Api extends Renderer.K8sApi.KubeApi<ConfigAuditReport> {
}

export class ClusterStore extends Renderer.K8sApi.KubeObjectStore<ClusterConfigAuditReport> {
    api = new ClusterApi({
        objectConstructor: ClusterConfigAuditReport
    })
}

export class Store extends Renderer.K8sApi.KubeObjectStore<ConfigAuditReport> {
    api = new Api({
        objectConstructor: ConfigAuditReport
    })
}

export const clusterStore = new ClusterStore()
export const store = new Store();

Renderer.K8sApi.apiManager.registerStore(clusterStore);
Renderer.K8sApi.apiManager.registerStore(store);
