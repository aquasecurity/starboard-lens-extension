import "./details.scss";
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {CISSectionsList} from "./cissections-list";
import {CISKubeBenchReport} from "./types";

const {
    Component: {
        KubeObjectMeta,
        DrawerItem,
        Badge,
    }
} = Renderer;

export interface CISKubeBenchReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<CISKubeBenchReport> {
    showObjectMeta?: boolean
}

export class CISKubeBenchReportDetails extends React.Component<CISKubeBenchReportDetailsProps> {

    render() {
        const {object: report} = this.props;
        if (!report) return null;
        return (
            <div className="CISKubeBenchReportDetails">
                {this.props.showObjectMeta &&
                <KubeObjectMeta
                    object={report}
                    hideFields={["uid", "resourceVersion", "selfLink"]}/>}

                <DrawerItem name="Summary" className="summary" labelsOnly>
                    <Badge className="Badge theme-fail"
                        label={report.report.summary.failCount}
                        tooltip="Fail"/>
                    <Badge className="Badge theme-warn"
                        label={report.report.summary.warnCount}
                        tooltip="Warn"/>
                    <Badge className="Badge theme-info"
                        label={report.report.summary.infoCount}
                        tooltip="Info"/>
                    <Badge className="Badge theme-pass"
                        label={report.report.summary.passCount}
                        tooltip="Pass"/>
                </DrawerItem>

                <CISSectionsList sections={report.report.sections}/>

            </div>
        )
    }
}
