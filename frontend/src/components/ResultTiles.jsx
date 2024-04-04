import { Card, Col, ListGroup } from "react-bootstrap/";
// import { useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";

function ResultCards() {


  return (
    <div className="result-container">
    <Card style={{ boxShadow: "-.1em 0 .4em rgb(73, 102, 102)", width: '90%', height: "40%" }}>
      <Card.Img style={{ height: "60%", width: "100%", objectFit: "cover"}} variant="top" src="https://i.insider.com/5db6fd7ddee019532146611b?width=700" />
      <Card.Body style={{paddingLeft: ".5em", paddingRight: ".5em"}}>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <Card.Body style={{paddingBottom: ".5em"}}>
        <Card.Link href="#">Card Link </Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </div>
  );
}

export default ResultCards;
