
import { useLocation, useNavigate } from 'react-router-dom';
import ObservationForm from '../components/observationForm';
import SightingLocationMap from '../components/sightingLocationMap';
import { useState } from 'react';
import './stylesheets/sightingLocationData.css'
import { api } from '../components/utilities';
import DateTimePickerValue from '../components/dateTime';

function SightingData() {
  const location = useLocation();
  const { imageSrc } = location.state
  const [positionData, setPositionData] = useState({})
  const [timeSighted, setTimeSighted] = useState(null)
  const navigate = useNavigate()

    // Set Position Data
    const handlePositionChange = (position) => {
      setPositionData(position);
    };

    console.log(positionData)

  const handleDateChange = (dateTime) => {
    setTimeSighted(dateTime)
    console.log(dateTime)
  }
  const handleFormSubmit = async(formData) => {
    const requestData = {
      ...formData, // Include the formData object as is
      image: imageSrc,
      lat: positionData.lat,
      lon: positionData.lng,
      sighting_date: timeSighted.sighting_date,
      created_date: timeSighted.created_date
    };
  

    console.log('Form data to be submitted:', requestData);
    try{
      const response = await api.post("/sightings/new/", { requestData })
      console.log('successfuly uploaded data', response.data);
      const newSighting = response.data
      navigate(`/profile/${newSighting.user}/sighting/${newSighting.id}`, {state: {newSighting}})

    } catch (response){
      console.log(response)
    }
  };
  
  return (
    <div className="sightingDataForm">
      <h1>Where was the manatee?</h1>
      <hr/>
      <SightingLocationMap onPositionChange={handlePositionChange}/>
      <DateTimePickerValue onDateChange={handleDateChange}/>
      <ObservationForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default SightingData;