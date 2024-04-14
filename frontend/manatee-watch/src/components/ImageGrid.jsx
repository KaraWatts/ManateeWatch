import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate} from 'react-router-dom';
import '../pages/stylesheets/imagegrid.css';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


function ImageGrid({ sightings, profileId }) {
  const navigate = useNavigate(); 

  const handleClick = (sightingId) => {
    navigate(`/profile/${profileId}/sighting/${sightingId}`);
  };

  return (
    <>

      
    <Box sx={{ width: "100%", height: "100%", overflowY: 'scroll', paddingLeft: "10px" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {sightings.map((data, index) => (
          <ImageListItem key={index} style={{cursor:"pointer"}}>
            <img
              srcSet={`${data.image}`}
              src={`${data.image}`}
              alt={'manatee'}
              loading="lazy"
              onClick={() => handleClick(data.id)}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </>
  );
}

ImageGrid.propTypes = {
  sightings: PropTypes.array.isRequired, // Make sure images prop is provided
};

export default ImageGrid;