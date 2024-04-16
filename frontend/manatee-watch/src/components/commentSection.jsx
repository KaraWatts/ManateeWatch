import { Avatar } from "@mui/material";
import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../pages/stylesheets/commentSection.css"
import { calculateTimeSincePost } from "./utilities";
import { api } from "./utilities";


export default function CommentSection({date, comment, user}) {

  const {display_name, profile_picture, user_id} = user
  const time = calculateTimeSincePost(date)

  const handleDelete = async (e) => {
    try{
      const response = await api.delete("sightings/2599/comment/22/")
      console.log(response.data)
    }catch(error){
      console.error("access denied", error);
    }
    
  }

  return (
    <>

       <Row  className="comment-container">
      <Col
        className="d-flex justify-content-end align-items-start"
        style={{ maxWidth: "100px", width: "20%" }}
      >
        <Image
          alt="avatar"
          src={profile_picture}
          sx={{ width: 80, height: 80 }}
          roundedCircle 
        />
      </Col>
      <Col style={{width:"70%"}}>
        <div className="media-body">
          <h4 className="media-heading user_name">{display_name}</h4>
          <p>{comment}</p>
        </div>
      </Col>
      <Col className="timestamps" >
        <p id="time">
          {time}
        </p>
        <p>
        {/* <a href="">Like</a>{" "} */}
        {/* <a href="">Edit</a>{" "} */}
        <a href="#" onClick={handleDelete}>Delete</a>{" "}
        </p>
      </Col>
    </Row>  
    </>
   
  );
}
