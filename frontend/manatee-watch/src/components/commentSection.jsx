import { Avatar } from "@mui/material";
import React from "react";
import { Row, Col } from "react-bootstrap";
import "../pages/stylesheets/commentSection.css"

export default function Basic() {
  const profilePic = JSON.parse(localStorage.getItem("user"));

  return (
    <Row className="comment-container">
      <Col
        className="d-flex justify-content-start align-items-center"
        style={{ maxWidth: "100px", width: "20%" }}
      >
        <Avatar
          alt="avatar"
          src={profilePic.profile_picture}
          sx={{ width: 80, height: 80 }}
        />
      </Col>
      <Col style={{width:"70%"}}>
        <div className="media-body">
          <h4 className="media-heading user_name">Baltej Singh</h4>
          <p>Awesome test comments</p>
        </div>
      </Col>
      <Col className="timestamps" >
        <p id="time">
          5 days ago
        </p>
        <p>
        <a href="">Like</a>{" "}
        </p>
      </Col>
    </Row>
  );
}
