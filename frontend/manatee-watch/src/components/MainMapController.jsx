import React, { FC, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet.smooth_marker_bouncing';

// TODO: Refactor sighting report map to incorpate this component - will need to map zoom an input variable

const MainMapController = ({positionData, setLoading, setSuccess}) => {
  const map = useMap();
 

  const flyTo = (location) => {
    map.flyTo(location, 13, {
      animate: true,
      duration: 2,
    });
  };

  const flyToCenter = () => {
    map.flyTo([28.334861, -81.708441], 8, {
      animate: true,
      duration: 1.5,
    });
  };


const mapLocate = useMapEvents({
    locationfound(e) {
      setLoading(false)
      setSuccess(true)
      mapLocate.flyTo(e.latlng, 11, {animate: true, duration:1.5});
    },
  });

  useEffect(() => {
    if(positionData) {
      flyTo(positionData.location);
    } else {
      flyToCenter();
    }
  }, [positionData])


  return null;
};

export default MainMapController ;