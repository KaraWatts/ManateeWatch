import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate} from 'react-router-dom'; // Import useNavigate
import '../pages/stylesheets/imagegrid.css';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


function ImageGrid({ sightings, profileId }) {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = (sightingId) => {
    navigate(`/profile/${profileId}/sighting/${sightingId}`);
  };

  return (
    <>

      <h1 style={{textAlign:"center"}}>Sightings</h1>
    {/* <div className="image-grid">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.alt}
          onClick={() => handleClick(index)}
        />
      ))}
    </div> */}
    <Box sx={{ width: "100%", height: "100%", overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {sightings.map((data, index) => (
          <ImageListItem key={index} style={{cursor:"pointer"}}>
            <img
              srcSet={`${data.image}`}
              src={`${data.iamge}`}
              alt={'manatee'}
              loading="lazy"
              onClick={() => handleClick(index)}
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