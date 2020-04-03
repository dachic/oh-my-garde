import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import guardAPI from "../../../api/guard";

const AffectButton = props => {
    const [color, setColor] = useState("primary");
    const [title, setTitle] = useState("Affecter");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (props.score.status) {
            if (props.score.status === "accepted") {
                updateButtonState("Accepté");
            }
            if (props.score.status === "pending") {
                updateButtonState("En attente");
            }
        }
    }, [props.score.status]);

    function affectIntern() {
        guardAPI.assignInternToGuard(props.guard, props.intern).then(response => {
            console.log(response === true)
            if (response === true) {
                updateButtonState("En attente")
            }
        })
    }

    function updateButtonState(status) {
        setDisabled(true);
        setColor("success");
        setTitle(status);
    }

    return (
        <Button
            color={color}
            onClick={() => affectIntern()}
            disabled={disabled}
        >
            {title}
        </Button>
    );
};

export default AffectButton;
