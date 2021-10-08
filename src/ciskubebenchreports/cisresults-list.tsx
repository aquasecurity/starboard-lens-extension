import React from "react";
import {Renderer} from "@k8slens/extensions";
import {CISResult} from "./types";

interface Props {
    title: string;
    results: CISResult[];
}

export class CISResultsList extends React.Component<Props> {

    getTableRow(index: number) {
        const {results} = this.props;
        return (
            <Renderer.Component.TableRow key={"" + index} nowrap>
                <Renderer.Component.TableCell
                    className="testStatus">{"" + results[index].status}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="testNumber">{results[index].test_number}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="testDescription">{results[index].test_desc}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="testScored">{"" + results[index].scored}</Renderer.Component.TableCell>
            </Renderer.Component.TableRow>
        )
    }

    render() {
        const {results, title} = this.props

        return (
            <div>
                <Renderer.Component.DrawerTitle title={title}/>
                <Renderer.Component.Table className="box grow">
                    <Renderer.Component.TableHead>
                        <Renderer.Component.TableCell className="testStatus">Status</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell className="testNumber">Number</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell
                            className="testDescription">Description</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell className="testScored">Scored</Renderer.Component.TableCell>
                    </Renderer.Component.TableHead>
                    {
                        results.map((result, index) => this.getTableRow(index))
                    }
                </Renderer.Component.Table>
            </div>
        )
    }
}
