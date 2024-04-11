
import SightingLocationMap from '../components/sightingLocationMap';
import './stylesheets/sightingLocationData.css'


function SightingData() {
//   const { user } = useOutletContext();

  return (
    <div className="sightingDataForm">
      <h1>Where was the manatee?</h1>
      <hr/>
      <SightingLocationMap />
    </div>
  );
}

export default SightingData;