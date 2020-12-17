import React from "react"
import styled from "@emotion/styled"
import {Vulnerability} from "../vulnerability-report"
import {Component} from "@k8slens/extensions"

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

export class VulnerabilitiesList extends React.Component<Props> {
    getTableRow = (uid: string) => {
        const {vulnerabilities} = this.props;
        const vulnerability = vulnerabilities.find(item => item.getId() == uid);
        let avdURL: string;
        let vulnID = vulnerability.getId();

        if (vulnID.startsWith('CVE-')) {
            avdURL =  `https://avd.aquasec.com/nvd/${vulnID}`.toLowerCase()
        } else if (vulnID.startsWith('RUSTSEC-')) {
            avdURL =  `https://rustsec.org/advisories/${vulnID}`
        } else if (vulnID.startsWith('GHSA-')) {
            avdURL =  `https://github.com/advisories/${vulnID}`
        } else if (vulnID.startsWith('TEMP-')) {
            avdURL =  `https://security-tracker.debian.org/tracker/${vulnID}`
        } else {
            avdURL =  `https://google.com/search?q=${vulnID}`
        }

        return (
            <Component.TableRow key={vulnID} nowrap sortItem={vulnerability}>
                <Component.TableCell className="vulnerabilityID">
                    <a target="_blank" href={avdURL}>{vulnID}</a>
                    </Component.TableCell>
                <Component.TableCell className="severity">{vulnerability.severity}</Component.TableCell>
                <Component.TableCell className="resource">{vulnerability.resource}</Component.TableCell>
                <Component.TableCell
                    className="installedVersion">{vulnerability.installedVersion}</Component.TableCell>
                <Component.TableCell
                    className="fixedVersion">{vulnerability.fixedVersion}</Component.TableCell>
            </Component.TableRow>
        );
    }

    sortBySeverity(): Vulnerability[]{
        const {vulnerabilities} = this.props

        // First: group severities by type
        const groupBySeverity: {[key: string]: Vulnerability[]} = {}

        for(let vulnerability of vulnerabilities){
            let {severity} = vulnerability;
            if(!groupBySeverity[severity]){
                groupBySeverity[severity] = []
            }
            groupBySeverity[severity].push(vulnerability);
        }
        
        // Second: add grouped severities in order from 
        // critical to unknown in a new array
        const sortedBySeverity: Vulnerability[] = []
        const severityTypes = ["critical", "high", "medium", "low", "unknown"]

        for(let severity in severityTypes){
            if(severity in groupBySeverity){
                sortedBySeverity.push(...groupBySeverity[severity])
            }
        }

        return sortedBySeverity
    }

    render() {
        const {vulnerabilities} = this.props
        const virtual = vulnerabilities.length > 50;
        if (!vulnerabilities.length) {
            return null;
        }

        return (
            <Wrapper>
                <Component.Table
                    virtual={virtual}
                    items={vulnerabilities}
                    getTableRow={this.getTableRow}
                >
                    <Component.TableHead>
                        <Component.TableCell className="vulnerabilityID">ID</Component.TableCell>
                        <Component.TableCell className="severity">Severity</Component.TableCell>
                        <Component.TableCell className="resource">Resource</Component.TableCell>
                        <Component.TableCell className="installedVersion">Installed Version</Component.TableCell>
                        <Component.TableCell className="fixedVersion">Fixed Version</Component.TableCell>
                    </Component.TableHead>
                    {
                        !virtual && this.sortBySeverity().map((vulnerability) => this.getTableRow(vulnerability.getId()))
                    }
                </Component.Table>
            </Wrapper>
        )
    }

}
