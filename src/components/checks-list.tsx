import {Check} from "../configaudit-report";
import React from "react";
import {Component} from "@k8slens/extensions";

interface Props {
    title: string;
    checks: Check[];
}

export class ChecksList extends React.Component<Props> {

    getTableRow(index: number) {
        const {checks} = this.props;
        return (
            <Component.TableRow key={checks[index].checkID} nowrap>
                <Component.TableCell className="xsuccess">{"" + checks[index].success}</Component.TableCell>
                <Component.TableCell className="checkID">{checks[index].checkID}</Component.TableCell>
                <Component.TableCell className="severity">{checks[index].severity}</Component.TableCell>
                <Component.TableCell className="category">{checks[index].category}</Component.TableCell>
            </Component.TableRow>
        )
    }

    render() {
        const {checks, title} = this.props
        if (!checks.length) {
            return null;
        }

        return (
            <div>
                <Component.DrawerTitle title={title}/>
                <Component.Table className="box grow">
                    <Component.TableHead>
                        <Component.TableCell className="xsuccess">Success</Component.TableCell>
                        <Component.TableCell className="checkID">ID</Component.TableCell>
                        <Component.TableCell className="severity">Severity</Component.TableCell>
                        <Component.TableCell className="category">Category</Component.TableCell>
                    </Component.TableHead>
                    {
                        checks.map((check, index) => this.getTableRow(index))
                    }
                </Component.Table>
            </div>
        )
    }
}
