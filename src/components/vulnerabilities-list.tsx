import React from "react"
import styled from "@emotion/styled"
import {Vulnerability} from "../vulnerability-report"
import {Renderer} from "@k8slens/extensions"

interface Props {
    vulnerabilities: Vulnerability[];
}

const Wrapper = styled.div`
  .Table.virtual {
      height: 500px;

      .VirtualList {
          height: 100%;
      }
  }
`

const severityOrder = new Map([
    ["CRITICAL", 0],
    ["HIGH", 1],
    ["MEDIUM", 2],
    ["LOW", 3],
    ["UNKNOWN", 4]
])

const BySeverity = (v1: Vulnerability, v2: Vulnerability) => {
    return severityOrder.get(v1.severity) - severityOrder.get(v2.severity)
}

export class VulnerabilitiesList extends React.Component<Props> {
    getTableRow = (uid: string) => {
        const {vulnerabilities} = this.props;
        const vulnerability = vulnerabilities.find(item => item.getId() == uid);
        let avdURL: string;
        let vulnID = vulnerability.getId();

        if (vulnID.startsWith('CVE-')) {
            avdURL = `https://avd.aquasec.com/nvd/${vulnID}`.toLowerCase()
        } else if (vulnID.startsWith('RUSTSEC-')) {
            avdURL = `https://rustsec.org/advisories/${vulnID}`
        } else if (vulnID.startsWith('GHSA-')) {
            avdURL = `https://github.com/advisories/${vulnID}`
        } else if (vulnID.startsWith('TEMP-')) {
            avdURL = `https://security-tracker.debian.org/tracker/${vulnID}`
        } else {
            avdURL = `https://google.com/search?q=${vulnID}`
        }

        return (
            <Renderer.Component.TableRow key={vulnID} nowrap sortItem={vulnerability}>
                <Renderer.Component.TableCell className="vulnerabilityID">
                    <a target="_blank" href={avdURL}>{vulnID}</a>
                </Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="severity">{vulnerability.severity}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="resource">{vulnerability.resource}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="installedVersion">{vulnerability.installedVersion}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="fixedVersion">{vulnerability.fixedVersion}</Renderer.Component.TableCell>
            </Renderer.Component.TableRow>
        );
    }

    render() {
        const {vulnerabilities} = this.props
        const virtual = vulnerabilities.length > 50;
        if (!vulnerabilities.length) {
            return null;
        }

        const sorted = vulnerabilities.sort(BySeverity)

        return (
            <Wrapper>
                <Renderer.Component.Table
                    tableId="vulnerabilitiesTable"
                    virtual={virtual}
                    items={sorted}
                    getTableRow={this.getTableRow}
                >
                    <Renderer.Component.TableHead>
                        <Renderer.Component.TableCell className="vulnerabilityID">ID</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell className="severity">Severity</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell className="resource">Resource</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell className="installedVersion">Installed
                            Version</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell className="fixedVersion">Fixed
                            Version</Renderer.Component.TableCell>
                    </Renderer.Component.TableHead>
                    {
                        !virtual && sorted.map((vulnerability) => this.getTableRow(vulnerability.getId()))
                    }
                </Renderer.Component.Table>
            </Wrapper>
        )
    }

}
