import { useState, useEffect } from "react";
import ImageGrid from "../components/ImageGrid";
import SightingDetails from "./SightingDetailsPage";
import { useParams } from "react-router-dom";
import "./stylesheets/profilepage.css";
import ProfileInfo from "../components/profileInfo";
import { api } from "../components/utilities";
import axios from "axios";

function ProfilePage() {
  const { profileId, sightingId } = useParams();
  const [profileData, setProfileData] = useState({})
  const [userSightings, setUserSightings] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.get("profile/" + profileId +"/");
        console.log('successfully retrieved data', response.data);
        setProfileData(response.data)
        setUserSightings(response.data['sightings'])
        setLoading(false)
      } catch (error) {
        console.error('error while uploading data', error);
      }
    };
  
    fetchdata();
  }, [])

  if (loading){
   return <div>Loading...</div>
  }


  return (
    <div>
    <div className="profile-info-container">
    <ProfileInfo />
    </div>
    <div className="profile-sightings-container">
      <div className="image-grid-container">
        <ImageGrid
          profileId={parseInt(profileId)}
          sightings={userSightings}
        />
      </div>
      {sightingId && ( // Conditionally render the sighting details if sightingId is present
        <div className="sighting-details-container">
          <SightingDetails sightingInfo={userSightings[0]} />
        </div>
      )}
    </div>
    </div>
  );
}

export default ProfilePage;
