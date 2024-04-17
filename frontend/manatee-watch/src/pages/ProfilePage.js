import { useState, useEffect } from "react";
import ImageGrid from "../components/ImageGrid";
import SightingDetails from "./SightingDetailsPage";
import { useParams, useLocation } from "react-router-dom";
import "./stylesheets/profilepage.css";
import ProfileInfo from "../components/profileInfo";
import { api } from "../components/utilities";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserMap from "../components/userMap";

function ProfilePage() {
  const { profileId, sightingId } = useParams();
  const [profileData, setProfileData] = useState({});
  const [userSightings, setUserSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.get("profile/" + profileId + "/");
        console.log("successfully retrieved data", response.data);
        setProfileData(response.data);
        setUserSightings(response.data["sightings"]);
        setLoading(false);
      } catch (error) {
        console.error("error while uploading data", error);
      }
    };

    fetchdata();
  }, [profileId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const PullSightingData = () => {
    const details = userSightings.filter(
      (sighting) => sighting.id === parseInt(sightingId)
    );
    return (
      <div className="sighting-details-container">
        <SightingDetails {...details[0]} sightingData={userSightings} setSightingData={setUserSightings}/>
      </div>
    );
  };

  const handleChange = (e) => {
    setToggle(e.target.checked);
  };

  return (
    <div>
      <div className="profile-info-container">
        <ProfileInfo {...profileData} />
      </div>
      <div className="profile-sightings-container" >
        <div className="image-grid-container">
        <h1 style={{textAlign:"center"}}>Sightings</h1>
          <Stack direction="row" justifyContent="center">
            <Typography>Grid</Typography>
            <Switch checked={toggle} onChange={handleChange} />
            <Typography>Map</Typography>
          </Stack>
          {toggle ? (
            <UserMap
              profileId={parseInt(profileId)}
              sightings={userSightings}
              num_sightings={profileData.num_sightings}
            />
          ) : (
            <ImageGrid
              profileId={parseInt(profileId)}
              sightings={userSightings}
            />
          )}
        </div>
        {sightingId && <PullSightingData />}
      </div>
    </div>
  );
}

export default ProfilePage;
