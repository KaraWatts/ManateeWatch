import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import './stylesheets/sightingdetails.css';
import CommentSection from '../components/commentSection';
import { Col, Row } from 'react-bootstrap';

function SightingDetails({ image, activity, comments, data_source, num_Adults, num_Calf, sighting_date, reactions }) {




  return (
    <div className="image-details">
    <h1>Sighting Details</h1>
        <img
          src={image}
          alt={"manatee"}
        />
        <p>{sighting_date}</p>
        <p>{comments}</p>
        <p>{activity}</p>
        <p>Adults: {num_Adults}</p>
        <p>Calves: {num_Calf}</p>
        {data_source && (<p>{data_source}</p>)}
        <div className='comments mt-3' style={{width:"100%", paddingLeft:"30px"}}>
        <Row>
          <Col>
        <h2>Comments</h2>
          </Col>
          <Col className='d-flex justify-content-end align-items-center' >
            <h5>45 comments</h5>
          </Col>
        </Row>
        <CommentSection />
        </div>
    </div>
  );
}

export default SightingDetails;
