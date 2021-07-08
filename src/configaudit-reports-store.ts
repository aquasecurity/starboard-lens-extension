import {Renderer} from "@k8slens/extensions";
import {ConfigAuditReport} from "./configaudit-report";

export class ConfigAuditReportsApi extends Renderer.K8sApi.KubeApi<ConfigAuditReport> {
}

export class ConfigAuditReportsStore extends Renderer.K8sApi.KubeObjectStore<ConfigAuditReport> {
    api = configAuditReportsApi
}

export const configAuditReportsApi = new ConfigAuditReportsApi({
    objectConstructor: ConfigAuditReport
});

export const configAuditReportsStore = new ConfigAuditReportsStore();

Renderer.K8sApi.apiManager.registerStore(configAuditReportsStore);
