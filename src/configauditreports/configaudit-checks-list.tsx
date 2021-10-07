import React from "react"
import {ChecksList} from "./checks-list";
import {Check} from "./types";

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
                <ChecksList title="" checks={podChecks}/>
                {
                    Object.keys(containerChecks).map((key, index) => <ChecksList title={key}
                                                                                 checks={containerChecks[key]}/>)
                }
            </div>
        )
    }

}
