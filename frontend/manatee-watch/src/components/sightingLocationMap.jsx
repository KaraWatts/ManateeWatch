import { useState, useEffect, useMemo, useRef, Button } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "../pages/stylesheets/sightingLocationData.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAsyncError } from "react-router-dom";

// function SightingLocationMap() {

    const LocateControl = () => {
    const [position, setPosition] = useState(null);
  const [marker, setMarker] = useState(null);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setMarker(
            <Marker
              draggable={true}
              eventHandlers={eventHandlers}
              position={marker.getLatLng()}
              ref={markerRef}
            ></Marker>
          );
          setPosition(marker.getLatLng);
        }
      },
    }),
    []
  );

  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 16);
      setMarker(
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={e.latlng}
          ref={markerRef}
        ></Marker>
      );
      setPosition(e.latlng);
    },
  });
  console.log(position)

  return marker;
};

const MapWithLocationButton = () => {
  const mapRef = useRef();

  const locateUser = () => {
    mapRef.current.locate();
  };

  return (
    <>
      <MapContainer
        center={[26.534861, -81.008441]}
        zoom={8}
        scrollWheelZoom={true}
        maxZoom={18}
        ref={mapRef}
        className="leaflet-sighting-container"
      >
        <LocateControl />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <button onClick={locateUser}>Locate Me</button>
    </>
  );
};

export default MapWithLocationButton;

//   const [findUser, setfindUser] = useState(false);
//   const [mapPin, setMapPin] = useState(null);

//   function LocationMarker() {
//     const [position, setPosition] = useState([26.534861, -81.008441]);
//     // create control and add to map
//     var lc = L.control.locate();

//     // request location update and set location
//     lc.start();

//     const markerRef = useRef(null);
//     const eventHandlers = useMemo(
//       () => ({
//         dragend() {
//           const marker = markerRef.current;
//           if (marker != null) {
//             setPosition(marker.getLatLng());
//           }
//         },
//       }),
//       []
//     );

//     return (
//       <Marker
//         draggable={true}
//         eventHandlers={eventHandlers}
//         position={position}
//         ref={markerRef}
//       ></Marker>
//     );
//   }

//   useEffect(() => {
//     setMapPin(<LocationMarker />);
//   }, [findUser]);

//   return (
//     <>
//       <MapContainer
//         center={[26.534861, -81.008441]}
//         zoom={8}
//         scrollWheelZoom={true}
//         maxZoom={18}
//         className="leaflet-sighting-container"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocateControl />
//       </MapContainer>
//       <button
//         onClick={() => (!findUser ? setfindUser(true) : setfindUser(false))}
//       >
//         Click for Current Location
//       </button>
//     </>
//   );
// }

// export default SightingLocationMap;
