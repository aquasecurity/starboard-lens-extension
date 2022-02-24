import React from "react";
import {Renderer} from "@k8slens/extensions";
import {Check} from "./types";

interface Props {
    checks: Check[];
}

export class ChecksList extends React.Component<Props> {

    getTableRow(index: number) {
        const {checks} = this.props;
        return (
            <Renderer.Component.TableRow key={checks[index].checkID} nowrap>
                <Renderer.Component.TableCell className="checkID">{checks[index].checkID}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="checkSeverity">{checks[index].severity}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell className="checkCategory">
                    <Renderer.Component.Badge flat expandable={false} key="imageRef" label={checks[index].title}
                                              tooltip={checks[index].message}/>
                </Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="checkSuccess">{"" + checks[index].success}</Renderer.Component.TableCell>
            </Renderer.Component.TableRow>
        )
    }

    render() {
        const {checks} = this.props
        if (!checks || !checks.length) {
            return null;
        }

        return (
            <div className="PodDetailsContainer">
                <Renderer.Component.Table>
                    <Renderer.Component.TableHead>
                        <Renderer.Component.TableCell className="checkID">ID</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell
                            className="checkSeverity">Severity</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell
                            className="checkCategory">Title</Renderer.Component.TableCell>
                        <Renderer.Component.TableCell
                            className="checkSuccess">Success</Renderer.Component.TableCell>
                    </Renderer.Component.TableHead>
                    {
                        checks.map((check, index) => this.getTableRow(index))
                    }
                </Renderer.Component.Table>
            </div>
        )
    }
}
