import { Card, Col, ListGroup } from "react-bootstrap/";
// import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function ResultCards({id, user_ID, sighting_date, image}) {
  // const {data, setData} = useOutletContext();

  return (
    <>
    <div style={{ margin: "1em", boxShadow: "-.1em 0 .4em rgb(73, 102, 102)", width: '90%', minHeight: "200px", height: "40%", textAlign:"center", position:"relative", color:"white", fontWeight:"bold"}}>
      <img style={{ height: "100%", width: "100%", objectFit: "cover"}} variant="top" src={image} alt="manatee" />
      <div style={{ position:"absolute", top:"8px", right:"16px"}}>{sighting_date}</div>
    </div>
    </>
  );
}

export default ResultCards;
