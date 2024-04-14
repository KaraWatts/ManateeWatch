import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate} from 'react-router-dom'; // Import useNavigate
import '../pages/stylesheets/imagegrid.css';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


function ImageGrid({ images, profileId }) {
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
        {images.map((image, index) => (
          <ImageListItem key={index} style={{cursor:"pointer"}}>
            <img
              srcSet={`${image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.url}?w=248&fit=crop&auto=format`}
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
  images: PropTypes.array.isRequired, // Make sure images prop is provided
};

export default ImageGrid;