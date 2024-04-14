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
  const [loading, setLoading] = useState(true); // State to track loading status

  const images = [
    {
      url: "https://www.discovercrystalriverfl.com/imager/s3_us-east-1_amazonaws_com/crystalriver-2019/images/CCmanatee18_1059925dafc489659acd47a728e6733c.jpg",
    },
    {
      url: "https://www.oceanlight.com/stock-photo/florida-manatee-underwater-picture-36329-12392.jpg",
    },
    {
      url: "https://i.huffpost.com/gen/1272530/thumbs/o-MANATEES-900.jpg?5",
    },
    {
      url: "https://i.pinimg.com/736x/50/98/40/50984039bfc109703fc141dd6d6b90db.jpg",
    },
  ];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.get("profile/" + profileId +"/");
        console.log('successfully retrieved data', response.data);
        
      } catch (error) {
        console.error('error while uploading data', error);
      }
    };
  
    fetchdata();
  }, [profileId])


  return (
    <div>
    <div className="profile-info-container">
    <ProfileInfo />
    </div>
    <div className="profile-sightings-container">
      <div className="image-grid-container">
        <ImageGrid
          profileId={parseInt(profileId)}
          images={images}
        />
      </div>
      {sightingId && ( // Conditionally render the sighting details if sightingId is present
        <div className="sighting-details-container">
          <SightingDetails sightingInfo={images[1]} />
        </div>
      )}
    </div>
    </div>
  );
}

export default ProfilePage;
