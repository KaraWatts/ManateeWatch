import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import "./stylesheets/sightingdetails.css";
import CommentSection from "../components/commentSection";
import { Col, Form, Row, Button, Image } from "react-bootstrap";
import { api } from "../components/utilities";
function SightingDetails({
  image,
  activity,
  comments,
  data_source,
  num_Adults,
  num_Calf,
  sighting_date,
  reactions,
}) {
  const {sightingId} = useParams()
  const user = JSON.parse(localStorage.getItem("user"));
  const [newComment, setNewComment] = useState(null)
  const [commentBoxOpen, setCommentBoxOpen] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.post("sightings/" + sightingId + "/comment/", newComment);
        console.log("successfully posted comment", response.data);
        setNewComment(null)
        
      } catch (error) {
        console.error("error while uploading comment", error);
      }
    };
    if (newComment){
      fetchdata();
    }
  }, [newComment]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault()
      setNewComment({"date": new Date(), "comment": e.target.value})
    }
  };

  console.log(reactions)

  return (
    <div className="image-details">
      <h1>Sighting Details</h1>
      <img src={image} alt={"manatee"} />
      <p>{sighting_date}</p>
      <p>{comments}</p>
      <p>{activity}</p>
      <p>Adults: {num_Adults}</p>
      <p>Calves: {num_Calf}</p>
      {data_source && <p>{data_source}</p>}
      <div
        className="comments mt-3"
        style={{ width: "100%", paddingLeft: "30px" }}
      >
        <Row>
          <Col>
            <h2>Comments</h2>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <h5>45 comments</h5>
          </Col>
        </Row>
        <CommentSection />
        <hr/>
        <Form className="new-comment-container">
        <Form.Group className="new-comment-avatar">
           <Image
          alt="avatar"
          src={user.profile_picture}
          style={{width:"4rem"}}
          roundedCircle 
        />
        </Form.Group>
          <Form.Group className="comment-box-container" controlId="comment-box-container">
            <Form.Control placeholder="Add Comment Here" 
            as="textarea" 
            rows={2}
            name="new-comment"
          // onChange={handleInputChange}
          onKeyDown={handleKeyDown}/>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default SightingDetails;
