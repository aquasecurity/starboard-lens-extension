import {K8sApi} from "@k8slens/extensions";
import {ConfigAuditReport} from "./configaudit-report";

export class ConfigAuditReportsApi extends K8sApi.KubeApi<ConfigAuditReport> {
}

export class ConfigAuditReportsStore extends K8sApi.KubeObjectStore<ConfigAuditReport> {
    api = configAuditReportsApi
}

export const configAuditReportsApi = new ConfigAuditReportsApi({
    objectConstructor: ConfigAuditReport
});

export const configAuditReportsStore = new ConfigAuditReportsStore();

K8sApi.apiManager.registerStore(configAuditReportsApi, configAuditReportsStore);
