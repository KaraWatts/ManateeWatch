import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import './stylesheets/sightingdetails.css';

function SightingDetails({ image, activity, comments, data_source, num_Adults, num_Calf, sighting_date }) {




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
    </div>
  );
}

export default SightingDetails;
