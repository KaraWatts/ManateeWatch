import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../pages/stylesheets/imagegrid.css";
import { Col, Row, Image } from "react-bootstrap";
import ImageUploadAndCrop from "./profilePicUpload";

function ProfileInfo({ display_name, profile_picture, ranking, num_sightings, sightings}) {
  
  const lastSighting = sightings[0]["sighting_date"].slice(0,10)
  
  
  return (
    <div className="profile-info" style={{display:"flex", flexDirection:"row"}}>
      <div className="profile-picture" style={{alignContent:"center", marginLeft:"10px"}}>
      <ImageUploadAndCrop />
      </div>
      <div className="profile-details" style={{width:"100%", textAlign:"center"}}>
      <Col>
        <Row>
            <h1>{display_name}</h1>
        </Row>
        <Row>
        <Col>
            <Row>
                <h4>{num_sightings}</h4>
            </Row>
            <Row>
               <h5>Manatees Sighted</h5> 
            </Row>
        </Col>
        <Col>
        <Row>
                <h4>{lastSighting}</h4>
            </Row>
            <Row>
               <h5>Last Sighted</h5> 
            </Row>
        </Col>
        <Col>
        <Row>
                <h4>{ranking}</h4>
            </Row>
            <Row>
               <h5>Ranking</h5> 
            </Row>
        </Col>
        </Row>
      </Col>

      </div>
    </div>
  );
}

export default ProfileInfo;
