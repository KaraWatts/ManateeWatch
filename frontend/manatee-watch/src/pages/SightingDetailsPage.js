import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import "./stylesheets/sightingdetails.css";
import CommentSection from "../components/commentSection";
import { Col, Form, Row, Button, Image } from "react-bootstrap";
import { submitNewComment } from "../components/utilities";
// import { submitNewComment } from "../components/utilities";
// import { submitNewComment } from "../components/utilities";


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
  const { sightingId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [newComment, setNewComment] = useState("");
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [commentPosts, setCommentPosts] = useState(reactions)




  useEffect(() => {
    
  },[commentPosts])


  
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && newComment && newComment !== "") {
      e.preventDefault();
      const data = {date: new Date(), comment: newComment}
      const post = await submitNewComment(sightingId, data)  
      if(post){
        setCommentPosts([...commentPosts, post])
        setNewComment("")
      }  
    }
  };


  return (
    <div className="image-details">
      <h1>Sighting Details</h1>
      <img src={image} alt={"manatee"} />
      <p>{sighting_date}</p>
      <p>{comments}</p>
      <p>Activity: {activity}</p>
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
            <h5>{commentPosts.length} comments</h5>
          </Col>
        </Row>
        {commentPosts.map((reaction)=> (
      <CommentSection key={reaction.id} setComments={setCommentPosts} commentPosts={commentPosts} activeUser={user['id']} {...reaction}/>
     ))}
        <hr />
        <Form className="new-comment-container">
          <Form.Group className="new-comment-avatar">
            <Image
              alt="avatar"
              src={user.profile_picture}
              style={{ width: "4rem" }}
              roundedCircle
            />
          </Form.Group>
          <Form.Group
            className="comment-box-container"
            controlId="comment-box-container"
          >
            <Form.Control
              placeholder="Add Comment Here"
              as="textarea"
              rows={2}
              name="new-comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default SightingDetails;
