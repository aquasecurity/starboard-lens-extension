import "./cisresults-list.scss";
import React from "react";
import {Renderer} from "@k8slens/extensions";
import {CISResult} from "./types";

const {
    Component: {
        Table,
        TableHead,
        TableRow,
        TableCell,
        DrawerTitle,
        Badge,
    }
} = Renderer;

interface Props {
    title: string;
    results: CISResult[];
}

export class CISResultsList extends React.Component<Props> {

    renderDescription(result: CISResult) {
        return (
            <Badge flat expandable={false} key="description" label={result.test_desc} tooltip={result.test_desc}/>
        )
    }

    getTableRow(index: number) {
        const {results} = this.props;
        return (
            <TableRow key={"" + index} nowrap>
                <TableCell className="number">{results[index].test_number}</TableCell>
                <TableCell className="description">{this.renderDescription(results[index])}</TableCell>
                <TableCell className="status">{results[index].status}</TableCell>
            </TableRow>
        )
    }

    render() {
        const {results, title} = this.props

        return (
            <div className="CISResultsList flex column">
                <DrawerTitle title={title}/>
                <Table selectable scrollable={false} className="CISResultsTable box grow">
                    <TableHead sticky={false}>
                        <TableCell className="number">Number</TableCell>
                        <TableCell className="description">Description</TableCell>
                        <TableCell className="status">Status</TableCell>
                    </TableHead>
                    {
                        results.map((result, index) => this.getTableRow(index))
                    }
                </Table>
            </div>
        )
    }
}
