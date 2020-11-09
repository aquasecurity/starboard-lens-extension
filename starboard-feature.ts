import {ClusterFeature, Store, K8sApi} from "@k8slens/extensions"
import * as path from "path"

export class StarboardFeature extends ClusterFeature.Feature {

    async install(cluster: Store.Cluster): Promise<void> {
        console.log("Installing starboard feature ...")
        super.applyResources(cluster,
            super.renderTemplates(path.join(__dirname, "../resources/")))
    }

    async upgrade(cluster: Store.Cluster): Promise<void> {
        console.log("Upgrading starboard feature ...")
        return this.install(cluster)
    }

    async updateStatus(cluster: Store.Cluster): Promise<ClusterFeature.FeatureStatus> {
        console.log("Updating status of the starboard feature ...")
        try {
            const namespaceApi = K8sApi.forCluster(cluster, K8sApi.Namespace)
            const starboardNs = await namespaceApi.get({name: "starboard"})
            if (starboardNs?.kind) {
                this.status.installed = true;
            } else {
                this.status.installed = false;
            }

        } catch (e) {
            if (e?.error?.code === 404) {
                this.status.installed = false
            }
        }
        return this.status
    }

    async uninstall(cluster: Store.Cluster): Promise<void> {
        console.log("Uninstalling starboard feature ...")
        const namespaceApi = K8sApi.forCluster(cluster, K8sApi.Namespace)
        const clusterRoleBindingApi = K8sApi.forCluster(cluster, K8sApi.ClusterRoleBinding)
        const clusterRoleApi = K8sApi.forCluster(cluster, K8sApi.ClusterRole)
        // TODO Delete Starboard CRDS
        // - vulnerabilityreports.aquasec.github.io
        // - configauditreports.aquasec.github.io
        // - ciskubebenchreports.aquasec.github.io
        // - kubehunterreports.aquasec.github.io

        await namespaceApi.delete({name: "starboard"})
        await clusterRoleBindingApi.delete({name: "starboard"})
        await clusterRoleApi.delete({name: "starboard"})
    }

}
