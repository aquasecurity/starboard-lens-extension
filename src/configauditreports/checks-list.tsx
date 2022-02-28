import "./checks-list.scss";
import React from "react";
import {Renderer} from "@k8slens/extensions";
import {Check} from "./types";

const {
    Component: {
        Table,
        TableHead,
        TableRow,
        TableCell,
        Badge,
    }
} = Renderer;

interface Props {
    checks: Check[];
}

const severityOrder = new Map([
    ["CRITICAL", 0],
    ["HIGH", 1],
    ["danger", 2],
    ["MEDIUM", 3],
    ["warning", 4],
    ["LOW", 5],
    ["UNKNOWN", 6],
])

const BySeverity = (v1: Check, v2: Check) => {
    return severityOrder.get(v1.severity) - severityOrder.get(v2.severity)
}

export class ChecksList extends React.Component<Props> {

    getTableRow = (uid: string) => {
        const {checks} = this.props;
        const check = checks.find(item => item.checkID == uid);
        let status = 'PASS'
        if (!check.success) {
            status = 'FAIL'
        }
        return (
            <TableRow key={check.checkID} nowrap>
                <TableCell className="checkID">
                    <Badge flat expandable={false} label={check.checkID} tooltip={check.checkID}/>
                </TableCell>
                <TableCell className="severity">
                    <Badge className={"Badge severity-" + check.severity} small label={check.severity}/>
                </TableCell>
                <TableCell className="message">
                    <Badge flat expandable={false} label={check.message} tooltip={check.message}/>
                </TableCell>
                <TableCell className="status">
                    <Badge className={"Badge status-" + status} small label={status}/>
                </TableCell>
            </TableRow>
        )
    }

    render() {
        const {checks} = this.props
        if (!checks || !checks.length) {
            return null;
        }

        const virtual = checks.length > 50;
        const sorted = checks.sort(BySeverity)

        return (
            <div className="ChecksList flex column">
                <Table className="box grow"
                       tableId="configurationChecksTable"
                       selectable
                       virtual={virtual}
                       items={sorted}
                       getTableRow={this.getTableRow}
                >
                    <TableHead>
                        <TableCell className="checkID">ID</TableCell>
                        <TableCell className="severity">Severity</TableCell>
                        <TableCell className="message">Message</TableCell>
                        <TableCell className="status">Status</TableCell>
                    </TableHead>
                    {
                        !virtual && sorted.map((check: Check) => this.getTableRow(check.getId()))
                    }
                </Table>
            </div>
        )
    }
}
