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
      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
      (sighting) => sighting.id === parseInt(sightingId)
    );
    return (
      <div className="sighting-details-container">
        // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
        <SightingDetails {...details[0]} sightingData={userSightings} setSightingData={setUserSightings}/>
      </div>
    );
  };

  const handleChange = (e: any) => {
    setToggle(e.target.checked);
  };

  return (
    <div>
      <div className="profile-info-container">
        <ProfileInfo {...profileData} />
      </div>
      <div className="profile-sightings-container" >
        {sightingId && <PullSightingData />}
        <div className="image-grid-container">
        <h1 style={{textAlign:"center"}}>Sightings</h1>
          <Stack direction="row" justifyContent="center">
            <Typography>Grid</Typography>
            <Switch checked={toggle} onChange={handleChange} />
            <Typography>Map</Typography>
          </Stack>
          {toggle ? (
            <UserMap
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              profileId={parseInt(profileId)}
              sightings={userSightings}
              // @ts-expect-error TS(2339): Property 'num_sightings' does not exist on type '{... Remove this comment to see the full error message
              num_sightings={profileData.num_sightings}
            />
          ) : (
            <ImageGrid
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              profileId={parseInt(profileId)}
              sightings={userSightings}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
