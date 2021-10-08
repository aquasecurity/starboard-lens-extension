import React from "react";
import {CISResultsList} from "./cisresults-list";
import {CISSection} from "./types";

interface Props {
    sections: CISSection[];
}

export class CISSectionsList extends React.Component<Props> {

    render() {
        const {sections} = this.props

        return (
            <div>
                {
                    sections.map((section, index) =>
                        <CISResultsList title={section.id + " " + section.text} results={section.tests[0].results}/>)
                }
            </div>
        )
    }
}
