import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function UserMap({ sightings, profileId }) {
  const lastSighting = sightings[sightings.length - 1];

  const navigate = useNavigate(); 

  const handleMarkerClick = (sightingId) => {

    navigate(`/profile/${profileId}/sighting/${sightingId}`);
  };

  const sightingPoints = () => {
    const markers = sightings.map((item) => {
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
        style={{ justifyContent: "center", height: "100%", width: "100%" }}
      >
        <MapContainer
          center={[lastSighting.lat, lastSighting.lon]}
          zoom={8}
          scrollWheelZoom={true}
          maxZoom={18}
          className="leaflet-user-container"
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sightingPoints()}
        </MapContainer>
      </div>
    </>
  );
}

export default UserMap;
