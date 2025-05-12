import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../pages/stylesheets/commentSection.css"
import { calculateTimeSincePost } from "./utilities";
import { useParams } from "react-router-dom";
import { api } from "./utilities";
import EditComment from "./editComment";


export default function CommentSection({date, comment, user, activeUser, id, setComments, commentPosts}) {
  const { sightingId } = useParams();
  const {display_name, profile_picture, user_id} = user
  const time = calculateTimeSincePost(date)

  const handleDelete = async (e) => {
    try{
      const response = await api.delete(`sightings/${sightingId}/comment/${id}/`)
      setComments(commentPosts.filter((comment) => comment.id !== id))
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
        {/* <a href="">Like</a>{" "} */}
        {user_id === activeUser && <div>
        <EditComment setComments={setComments} id={id} commentPosts={commentPosts}/>
        <button type="button" onClick={handleDelete} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color:"blue" }}>
  Delete
</button></div>}
      </Col>
    </Row>  
    <hr/>
    </>
   
  );
}
