import {Renderer} from "@k8slens/extensions";
import {ClusterConfigAuditReport, ConfigAuditReport} from "./configaudit-report";

export class ClusterConfigAuditReportsApi extends Renderer.K8sApi.KubeApi<ClusterConfigAuditReport> {
}

export const clusterConfigAuditReportsApi = new ClusterConfigAuditReportsApi({
    objectConstructor: ClusterConfigAuditReport
});

export class ClusterConfigAuditReportStore extends Renderer.K8sApi.KubeObjectStore<ClusterConfigAuditReport> {
    api = clusterConfigAuditReportsApi
}

export class ConfigAuditReportsApi extends Renderer.K8sApi.KubeApi<ConfigAuditReport> {
}

export const configAuditReportsApi = new ConfigAuditReportsApi({
    objectConstructor: ConfigAuditReport
});

export class ConfigAuditReportsStore extends Renderer.K8sApi.KubeObjectStore<ConfigAuditReport> {
    api = configAuditReportsApi
}

export const clusterConfigAuditReportsStore = new ClusterConfigAuditReportStore()
export const configAuditReportsStore = new ConfigAuditReportsStore();

Renderer.K8sApi.apiManager.registerStore(clusterConfigAuditReportsStore);
Renderer.K8sApi.apiManager.registerStore(configAuditReportsStore);
