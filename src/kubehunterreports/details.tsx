import "./details.scss"
import {Renderer} from "@k8slens/extensions";
import React from "react";
import {KubeHunterReport, Vulnerability} from "./types";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  .Table.virtual {
      height: 500px;

      .VirtualList {
          height: 100%;
      }
  }
`

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
            <Renderer.Component.TableRow key={vulnID} nowrap sortItem={vulnerability}>
                <Renderer.Component.TableCell className="vulnerabilityID">
                    <a target="_blank" href={vulnerability.avd_reference}>{vulnID}</a>
                </Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="severity">{vulnerability.severity}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="category">{vulnerability.category}</Renderer.Component.TableCell>
            </Renderer.Component.TableRow>
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
                <Renderer.Component.KubeObjectMeta
                    object={report}
                    hideFields={["uid", "resourceVersion", "selfLink"]}/>}

                <Renderer.Component.DrawerItem name="Summary" className="summary" labelsOnly>
                    <Renderer.Component.Badge
                        className="Badge theme-high"
                        label={report.report.summary.highCount}
                        tooltip="High"/>
                    <Renderer.Component.Badge
                        className="Badge theme-medium"
                        label={report.report.summary.mediumCount}
                        tooltip="Medium"/>
                    <Renderer.Component.Badge
                        className="Badge theme-low"
                        label={report.report.summary.lowCount}
                        tooltip="Low"/>
                    <Renderer.Component.Badge
                        className="Badge theme-unknown"
                        label={report.report.summary.unknownCount}
                        tooltip="Unknown"/>
                </Renderer.Component.DrawerItem>

                <Renderer.Component.DrawerTitle title={"Vulnerabilities"}/>

                <Wrapper>
                    <Renderer.Component.Table
                        tableId="kubeHunterVulnerabilitiesTable"
                        virtual={virtual}
                        items={vulnerabilities}
                        getTableRow={this.getTableRow}
                    >
                        <Renderer.Component.TableHead>
                            <Renderer.Component.TableCell className="vulnerabilityID">ID</Renderer.Component.TableCell>
                            <Renderer.Component.TableCell className="severity">Severity</Renderer.Component.TableCell>
                            <Renderer.Component.TableCell className="category">Category</Renderer.Component.TableCell>
                        </Renderer.Component.TableHead>
                        {
                            !virtual && vulnerabilities.map((vulnerability) => this.getTableRow(vulnerability.getId()))
                        }
                    </Renderer.Component.Table>
                </Wrapper>

            </div>
        )
    }
}
