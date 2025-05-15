
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
    const handlePositionChange = (position: any) => {
      setPositionData(position);
    };

    console.log(positionData)

  const handleDateChange = (dateTime: any) => {
    setTimeSighted(dateTime)
    console.log(dateTime)
  }
  const handleFormSubmit = async (formData: any) => {
    const requestData = {
      ...formData, // Include the formData object as is
      image: imageSrc,
      // @ts-expect-error TS(2339): Property 'lat' does not exist on type '{}'.
      lat: positionData.lat,
      // @ts-expect-error TS(2339): Property 'lng' does not exist on type '{}'.
      lon: positionData.lng,
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      sighting_date: timeSighted.sighting_date,
      // @ts-expect-error TS(2531): Object is possibly 'null'.
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
      <h1>Where are the manatees?</h1>
      <hr/>
      <SightingLocationMap onPositionChange={handlePositionChange}/>
      <DateTimePickerValue onDateChange={handleDateChange}/>
      <ObservationForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default SightingData;