import ImageUpload from '../components/imageUpload';
import './stylesheets/SightingReport.css'


function SightingReport() {
//   const { user } = useOutletContext();

  return (
    <div className="sightingReport">
      <h1>Capture Image here</h1>
      <hr/>
      <ImageUpload />
    </div>
  );
}

export default SightingReport;