import React from "react";
import { Card,CardTitle,CardSubtitle,CardBody } from "reactstrap";

const InternDetails = props => {
  const rank = 50 + (props.rank * 60)

  const cardStyle = {
    display:"none",
    borderColor: '#333',
    backgroundColor: "white",
    position: "absolute",
    top: rank,
    left:"0%"
  }

    return (
      <Card style={cardStyle} id={"internDetails-"+props.rank}>
        <CardBody>
          <CardTitle>{props.contact.lastname.toUpperCase()} {props.contact.firstname}</CardTitle>
          <CardSubtitle>{props.contact.phoneNumber}</CardSubtitle>
          <CardSubtitle>{props.contact.email}</CardSubtitle>
        </CardBody>
      </Card>
    );
};

export default InternDetails;
