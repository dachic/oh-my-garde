import React from "react";
import { Media } from "reactstrap";

const GuardMedia = props => {
    return (
        <Media className="border-bottom px-3 py-4">
            <Media>
                <h5 className="mt-0 mb-1 font-weight-normal">{props.title}</h5>
                <span className="text-muted">{props.description}}</span>
            </Media>
        </Media>
    );
};

export default GuardMedia;
