import React from "react"
import {Check} from "../configaudit-report";
import {ChecksList} from "./checks-list";

interface Props {
    podChecks: Check[];
    containerChecks: {
        [key: string]: Check[]
    }
}

export class ConfigAuditChecksList extends React.Component<Props> {

    render() {
        const {podChecks, containerChecks} = this.props

        return (
            <div>
                <ChecksList title="Pod Template Checks" checks={podChecks}/>
                {
                    Object.keys(containerChecks).map((key, index) => <ChecksList title={"Container Checks " + key}
                                                                                 checks={containerChecks[key]}/>)
                }
            </div>
        )
    }

}
