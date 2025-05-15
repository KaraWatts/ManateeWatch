
import { useState, useMemo, useRef} from "react";
import {
  Marker,
  useMapEvents,
} from "react-leaflet";
import "../pages/stylesheets/sightingLocationData.css";
import "leaflet/dist/leaflet.css";

// 
const LocateControl = ({
  onPositionChange,
  setSuccess,
  setLoading
}: any) => {
    const [position, setPosition] = useState(null);
    const [marker, setMarker] = useState(null);
  
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setMarker(
              // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
              <Marker
                // @ts-expect-error TS(2322): Type '{ draggable: boolean; eventHandlers: { drage... Remove this comment to see the full error message
                draggable={true}
                eventHandlers={eventHandlers}
                // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
                position={marker.getLatLng()}
                ref={markerRef}
              ></Marker>
            );
            // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
            setPosition(marker.getLatLng());
            // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
            onPositionChange(marker.getLatLng());
          }
        },
      }),
      []
    );
  
    const map = useMapEvents({
      locationfound(e: any) {
        map.flyTo(e.latlng, 15, {animate: true, duration:1.5});
        setSuccess(true);
        setLoading(false);
        setMarker(
          // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
          <Marker
            // @ts-expect-error TS(2322): Type '{ draggable: boolean; eventHandlers: { drage... Remove this comment to see the full error message
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