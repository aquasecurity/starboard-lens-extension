import React from "react";
import {Component} from "@k8slens/extensions";
import {CISResult} from "../ciskubebench-report";

interface Props {
    title: string;
    results: CISResult[];
}

export class CISResultsList extends React.Component<Props> {

    getTableRow(index: number) {
        const {results} = this.props;
        return (
            <Component.TableRow key={"" + index} nowrap>
                <Component.TableCell className="testStatus">{"" + results[index].status}</Component.TableCell>
                <Component.TableCell className="testNumber">{results[index].test_number}</Component.TableCell>
                <Component.TableCell className="testDescription">{results[index].test_desc}</Component.TableCell>
                <Component.TableCell className="testScored">{"" + results[index].scored}</Component.TableCell>
            </Component.TableRow>
        )
    }

    render() {
        const {results, title} = this.props

        return (
            <div>
                <Component.DrawerTitle title={title}/>
                <Component.Table className="box grow">
                    <Component.TableHead>
                        <Component.TableCell className="testStatus">Status</Component.TableCell>
                        <Component.TableCell className="testNumber">Number</Component.TableCell>
                        <Component.TableCell className="testDescription">Description</Component.TableCell>
                        <Component.TableCell className="testScored">Scored</Component.TableCell>
                    </Component.TableHead>
                    {
                        results.map((result, index) => this.getTableRow(index))
                    }
                </Component.Table>
            </div>
        )
    }
}
