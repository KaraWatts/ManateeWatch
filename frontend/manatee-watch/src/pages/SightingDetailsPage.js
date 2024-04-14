import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import './stylesheets/sightingdetails.css';

function SightingDetails({ sightingInfo }) {


console.log(sightingInfo)

  return (
    <div className="image-details">
    <h1>Sighting Details</h1>
        <img
          src={sightingInfo.image}
          alt={"manatee"}
        />
    </div>
  );
}

export default SightingDetails;
