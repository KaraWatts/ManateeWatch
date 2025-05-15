import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'leaf... Remove this comment to see the full error message
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function UserMap({
  sightings,
  profileId,
  num_sightings
}: any) {
  const [lastSighting, setLastSighting] = useState([28.334861, -81.708441])

  useEffect(() => {
    if (num_sightings>0){
    const lastSighting = sightings[num_sightings-1]['sighting_date'].slice(0,10)
    setLastSighting([parseFloat(lastSighting.lat), parseFloat(lastSighting.lon)]);
  }else{

    setLastSighting([28.334861, -81.708441])
  }
},[num_sightings])
  


  const navigate = useNavigate(); 

  const handleMarkerClick = (sightingId: any) => {

    navigate(`/profile/${profileId}/sighting/${sightingId}`);
  };

  const sightingPoints = () => {
    const markers = sightings.map((item: any) => {
      const handleClick = () => {
        handleMarkerClick(item.id);
      };
      return (
        <Marker
          key={item.id}
          position={[parseFloat(item.lat), parseFloat(item.lon)]}
          eventHandlers={{ click: handleClick }}
        >
          <Tooltip>
            <img
              className="manateeImg"
              src={
                item.image
                  ? item.image
                  : "https://i.insider.com/5db6fd7ddee019532146611b?width=700"
              }
              alt="Manatee"
            />
          </Tooltip>
        </Marker>
      );
    });
    return (
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={100}
        disableClusteringAtZoom={16}
        spiderfyOnMaxZoom={false}
      >
        {markers}
      </MarkerClusterGroup>
    );
  };

  return (
    <>
      <div
        className="userMapContainer flex"
        style={{ justifyContent: "center", height: "100%", width: "100%"}}
      >
        <MapContainer
          // @ts-expect-error TS(2322): Type '{ children: (false | Element)[]; center: num... Remove this comment to see the full error message
          center={lastSighting}
          zoom={8}
          scrollWheelZoom={true}
          maxZoom={18}
          className="leaflet-user-container"
          style={{ height: "50vh", minHeight:"300px", width: "100%", marginBottom:"10px"}}
        >
          <TileLayer
            // @ts-expect-error TS(2322): Type '{ attribution: string; url: string; }' is no... Remove this comment to see the full error message
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {num_sightings>0 && sightingPoints()}
        </MapContainer>
      </div>
    </>
  );
}

export default UserMap;
