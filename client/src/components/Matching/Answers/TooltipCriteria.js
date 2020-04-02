import React, { useState } from "react";
import {Tooltip} from 'reactstrap'

const TooltipCriteria = props => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    console.log(props);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
        <i className="uil uil-info-circle" id={props.id}><span style={{fontSize:"10px"}}>{props.title}</span></i>
        <Tooltip placement="right" isOpen={tooltipOpen} target={props.id} toggle={toggle} >
          {props.description}
        </Tooltip>
      </div>
    );
};

export default TooltipCriteria;
