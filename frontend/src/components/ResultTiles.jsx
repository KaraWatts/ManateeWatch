import { Card, Col, ListGroup } from "react-bootstrap/";
// import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function ResultCards({id, user_ID, sighting_date, image}) {
  // const {data, setData} = useOutletContext();

  return (
    <>
    <Card style={{ margin: "1em", boxShadow: "-.1em 0 .4em rgb(73, 102, 102)", width: '90%', height: "40%" }}>
      <Card.Img style={{ height: "85%", width: "100%", objectFit: "cover"}} variant="top" src={image} />
      <Card.Body className="sighting_card">
        <Card.Text style={{ marginTop: "0", marginLeft: "1em", marginBottom: ".1em"}}>{sighting_date}</Card.Text>
      </Card.Body>
      {/* <Card.Body style={{paddingBottom: ".5em"}}>
        <Card.Link href="#">Card Link </Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body> */}
    </Card>
    </>
  );
}

export default ResultCards;
