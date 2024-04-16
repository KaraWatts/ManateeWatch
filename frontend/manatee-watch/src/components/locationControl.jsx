
import { useState, useMemo, useRef} from "react";
import {
  Marker,
  useMapEvents,
} from "react-leaflet";
import "../pages/stylesheets/sightingLocationData.css";
import "leaflet/dist/leaflet.css";

// 
const LocateControl = ({ onPositionChange }) => {
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
            setPosition(marker.getLatLng());
            onPositionChange(marker.getLatLng());
          }
        },
      }),
      []
    );
  
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(e.latlng, 15, {animate: true, duration:1.5});
        setMarker(
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={e.latlng}
            ref={markerRef}
          ></Marker>
        );
        setPosition(e.latlng);
        onPositionChange(e.latlng);
      },
    });
  
  
    return marker;
  };

  export default LocateControl;