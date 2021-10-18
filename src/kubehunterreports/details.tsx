import "./details.scss"
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {KubeHunterReport, Vulnerability} from "./types";

const {
    Component: {
        KubeObjectMeta,
        Table,
        TableHead,
        TableRow,
        TableCell,
        DrawerItem,
        DrawerTitle,
        Badge,
    }
} = Renderer;


export interface KubeHunterReportDetailsProps extends Renderer.Component.KubeObjectDetailsProps<KubeHunterReport> {
    showObjectMeta?: boolean
}

export class KubeHunterReportDetails extends React.Component<KubeHunterReportDetailsProps> {

    getTableRow = (uid: string) => {
        const {object: report} = this.props;
        const {report: {vulnerabilities: items}} = report;
        const vulnerabilities = items.map((vulnerability) => new Vulnerability(vulnerability))
        const vulnerability = vulnerabilities.find(item => item.getId() == uid);
        let vulnID = vulnerability.getId();

        return (
            <TableRow key={vulnID} nowrap sortItem={vulnerability}>
                <TableCell className="vulnerabilityID">
                    <a target="_blank" href={vulnerability.avd_reference}>{vulnID}</a>
                </TableCell>
                <TableCell className={"severity " + vulnerability.severity}>{vulnerability.severity}</TableCell>
                <TableCell className="description">
                    <Badge flat expandable={false} key="description" label={vulnerability.description}
                           tooltip={vulnerability.description}/>
                </TableCell>
                <TableCell className="category">{vulnerability.category}</TableCell>
            </TableRow>
        );
    }

    render() {
        const {object: report} = this.props;
        const {report: {vulnerabilities: items}} = report;
        const virtual = items.length > 50;
        const vulnerabilities = items.map((vulnerability) => new Vulnerability(vulnerability))

        if (!report) return null;
        return (
            <div className="KubeHunterReportDetails">
                {this.props.showObjectMeta &&
                <KubeObjectMeta object={report} hideFields={["uid", "resourceVersion", "selfLink"]}/>}

                <DrawerItem className="VulnerabilitySummary" name="Summary" labelsOnly>
                    <Badge className="Badge theme-high"
                           label={report.report.summary.highCount}
                           tooltip="High"/>
                    <Badge className="Badge theme-medium"
                           label={report.report.summary.mediumCount}
                           tooltip="Medium"/>
                    <Badge className="Badge theme-low"
                           label={report.report.summary.lowCount}
                           tooltip="Low"/>
                    <Badge className="Badge theme-unknown"
                           label={report.report.summary.unknownCount}
                           tooltip="Unknown"/>
                </DrawerItem>

                <DrawerTitle title={"Vulnerabilities"}/>

                <div className="flex column">
                    <Table className="VulnerabilityTable box grow" selectable scrollable={false}
                           tableId="kubeHunterVulnerabilitiesTable"
                           virtual={virtual}
                           items={vulnerabilities}
                           getTableRow={this.getTableRow}>
                        <TableHead>
                            <TableCell className="vulnerabilityID">ID</TableCell>
                            <TableCell className="severity">Severity</TableCell>
                            <TableCell className="description">Description</TableCell>
                            <TableCell className="category">Category</TableCell>
                        </TableHead>
                        {
                            !virtual && vulnerabilities.map((vulnerability: Vulnerability) => this.getTableRow(vulnerability.getId()))
                        }
                    </Table>
                </div>

            </div>
        )
    }
}
