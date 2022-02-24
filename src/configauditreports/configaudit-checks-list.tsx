import React from "react"
import {ChecksList} from "./checks-list";
import {Check} from "./types";

interface Props {
    checks?: Check[]
}

export class ConfigAuditChecksList extends React.Component<Props> {

    render() {
        const {checks} = this.props

        return (
            <ChecksList checks={checks}/>
        )
    }

}
