import React, { FC, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet.smooth_marker_bouncing';

const MainMapController = ({positionData}) => {
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