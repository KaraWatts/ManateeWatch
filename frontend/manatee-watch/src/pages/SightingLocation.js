
import { useLocation } from 'react-router-dom';
import ObservationForm from '../components/observationForm';
import SightingLocationMap from '../components/sightingLocationMap';
import { useState } from 'react';
import './stylesheets/sightingLocationData.css'


function SightingData() {
  const location = useLocation();
  const { imageSrc } = location.state
  const [positionData, setPositionData] = useState({})

    // Function to handle position data
    const handlePositionChange = (position) => {
      // console.log('Position data:', position);
      setPositionData(position);
    };
    // console.log("Stored Position data", positionData.lat)

  const handleFormSubmit = (formData) => {
    formData['url'] = imageSrc;
    formData['lat'] = positionData.lat;
    formData['lon'] = positionData.lon;
    console.log('Form data submitted:', formData);
    
  };
  
  return (
    <div className="sightingDataForm">
      <h1>Where was the manatee?</h1>
      <hr/>
      <SightingLocationMap onPositionChange={handlePositionChange}/>
      <ObservationForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default SightingData;