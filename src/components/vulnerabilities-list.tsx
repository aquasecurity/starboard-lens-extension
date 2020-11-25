import {Component} from "@k8slens/extensions"
import React from "react"
import {Vulnerability} from "../vulnerability-report";

interface Props {
    vulnerabilities: Vulnerability[];
}

export class VulnerabilitiesList extends React.Component<Props> {

    getTableRow(index: number) {
        const {vulnerabilities} = this.props;

        let avdURL: JSX.Element;
        let vulnID = vulnerabilities[index].vulnerabilityID;

        if (vulnID.startsWith('CVE-')) {
            avdURL =  <a target="_blank" href={`https://avd.aquasec.com/nvd/${vulnID}`.toLowerCase()}>{vulnID}</a>;
        } else if (vulnID.startsWith('RUSTSEC-')) {
            avdURL =  <a target="_blank" href={`https://rustsec.org/advisories/${vulnID}`}>{vulnID}</a>;
        } else if (vulnID.startsWith('GHSA-')) {
            avdURL =  <a target="_blank" href={`https://github.com/advisories/${vulnID}`}>{vulnID}</a>;
        } else if (vulnID.startsWith('TEMP-')) {
            avdURL =  <a target="_blank" href={`https://security-tracker.debian.org/tracker/${vulnID}`}>{vulnID}</a>;
        } else {
            avdURL =  <a target="_blank" href={`https://google.com/search?q=${vulnID}`}>{vulnID}</a>;
        }

        return (
            <Component.TableRow key={vulnID} nowrap>
                <Component.TableCell className="vulnerabilityID">{avdURL}</Component.TableCell>
                <Component.TableCell className="severity">{vulnerabilities[index].severity}</Component.TableCell>
                <Component.TableCell className="resource">{vulnerabilities[index].resource}</Component.TableCell>
                <Component.TableCell
                    className="installedVersion">{vulnerabilities[index].installedVersion}</Component.TableCell>
                <Component.TableCell
                    className="fixedVersion">{vulnerabilities[index].fixedVersion}</Component.TableCell>
            </Component.TableRow>
        );
    }

    render() {
        const {vulnerabilities} = this.props
        if (!vulnerabilities.length) {
            return null;
        }

        return (
            <div>
                <Component.Table>
                    <Component.TableHead>
                        <Component.TableCell className="vulnerabilityID">ID</Component.TableCell>
                        <Component.TableCell className="severity">Severity</Component.TableCell>
                        <Component.TableCell className="resource">Resource</Component.TableCell>
                        <Component.TableCell className="installedVersion">Installed Version</Component.TableCell>
                        <Component.TableCell className="fixedVersion">Fixed Version</Component.TableCell>
                    </Component.TableHead>
                    {
                        vulnerabilities.map((vulnerability, index) => this.getTableRow(index))
                    }
                </Component.Table>
            </div>
        )
    }

}
