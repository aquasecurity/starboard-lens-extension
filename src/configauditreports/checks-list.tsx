import React from "react";
import {Renderer} from "@k8slens/extensions";
import {Check} from "./types";

interface Props {
    title: string;
    checks: Check[];
}

export class ChecksList extends React.Component<Props> {

    getTableRow(index: number) {
        const {checks} = this.props;
        return (
            <Renderer.Component.TableRow key={checks[index].checkID} nowrap>
                <Renderer.Component.TableCell
                    className="checkSuccess">{"" + checks[index].success}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell className="checkID">{checks[index].checkID}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="checkSeverity">{checks[index].severity}</Renderer.Component.TableCell>
                <Renderer.Component.TableCell
                    className="checkCategory">{checks[index].category}</Renderer.Component.TableCell>
            </Renderer.Component.TableRow>
        )
    }

    render() {
        const {checks, title} = this.props
        if (!checks.length) {
            return null;
        }

        return (
            <div className="PodDetailsContainer">
                {1 === 1 &&
                <div className="pod-container-title">
                    <Renderer.Component.StatusBrick
                        className="error"/>{title}
                </div>}

                <Renderer.Component.DrawerItem name="Checks">
                    <Renderer.Component.DrawerParamToggler label={checks.length}>
                        <Renderer.Component.Table>
                            <Renderer.Component.TableHead>
                                <Renderer.Component.TableCell
                                    className="checkSuccess">Success</Renderer.Component.TableCell>
                                <Renderer.Component.TableCell className="checkID">ID</Renderer.Component.TableCell>
                                <Renderer.Component.TableCell
                                    className="checkSeverity">Severity</Renderer.Component.TableCell>
                                <Renderer.Component.TableCell
                                    className="checkCategory">Category</Renderer.Component.TableCell>
                            </Renderer.Component.TableHead>
                            {
                                checks.map((check, index) => this.getTableRow(index))
                            }
                        </Renderer.Component.Table>
                    </Renderer.Component.DrawerParamToggler>
                </Renderer.Component.DrawerItem>

            </div>
        )
    }
}
