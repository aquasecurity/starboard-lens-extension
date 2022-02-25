import React from "react";
import {CISResultsList} from "./cisresults-list";
import {CISSection} from "./types";
import {Renderer} from "@k8slens/extensions";

const {
    Component: {
        DrawerTitle,
    }
} = Renderer;

interface Props {
    sections: CISSection[];
}

export class CISSectionsList extends React.Component<Props> {

    render() {
        const {sections} = this.props

        let rows = []

        for (let section of sections) {
            rows.push(<DrawerTitle title={section.id + " " + section.text}/>)
            for (let test of section.tests) {
                rows.push(<DrawerTitle title={test.section + " " + test.desc}/>)
                rows.push(<CISResultsList results={test.results}/>)
            }
        }

        return <div>{rows}</div>
    }
}
