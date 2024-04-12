
import { useLocation } from 'react-router-dom';
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

    // Set Position Data
    const handlePositionChange = (position) => {
      setPositionData(position);
    };

  const handleDateChange = (dateTime) => {
    setTimeSighted(dateTime)
    console.log(dateTime)
  }
  const handleFormSubmit = async(formData) => {
    formData['url'] = imageSrc;
    formData['lat'] = positionData.lat;
    formData['lon'] = positionData.lon;
    formData['sighting_date'] = timeSighted.sighting_date
    formData['created_date'] = timeSighted.created_date

    console.log('Form data to be submitted:', formData);
    try{
      const response = await api.post("/sightings/new/", { formData })
      console.log('successfuly uploaded data', response.data);

    } catch (response){
      console.log('successfuly uploaded image:', "Innapropriate content warning!")
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