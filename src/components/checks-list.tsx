import {Check} from "../configaudit-report";
import React from "react";
import {Component} from "@k8slens/extensions";
import {VulnerabilitiesList} from "./vulnerabilities-list";

interface Props {
    title: string;
    checks: Check[];
}

export class ChecksList extends React.Component<Props> {

    getTableRow(index: number) {
        const {checks} = this.props;
        return (
            <Component.TableRow key={checks[index].checkID} nowrap>
                <Component.TableCell className="checkSuccess">{"" + checks[index].success}</Component.TableCell>
                <Component.TableCell className="checkID">{checks[index].checkID}</Component.TableCell>
                <Component.TableCell className="checkSeverity">{checks[index].severity}</Component.TableCell>
                <Component.TableCell className="checkCategory">{checks[index].category}</Component.TableCell>
            </Component.TableRow>
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
                    <Component.StatusBrick
                        className="error"/>{title}
                </div>}

                <Component.DrawerItem name="Checks">
                    <Component.DrawerParamToggler label={checks.length}>
                        <Component.Table>
                            <Component.TableHead>
                                <Component.TableCell className="checkSuccess">Success</Component.TableCell>
                                <Component.TableCell className="checkID">ID</Component.TableCell>
                                <Component.TableCell className="checkSeverity">Severity</Component.TableCell>
                                <Component.TableCell className="checkCategory">Category</Component.TableCell>
                            </Component.TableHead>
                            {
                                checks.map((check, index) => this.getTableRow(index))
                            }
                        </Component.Table>
                    </Component.DrawerParamToggler>
                </Component.DrawerItem>

            </div>
        )
    }
}
