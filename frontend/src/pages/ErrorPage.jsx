import { Col, Row } from "react-bootstrap";
import logo from "../assets/manateeLogo.png";
function ErrorPage() {
  return (
    <>
      <Row className="d-flex align-items-center">
        <Col className="justify-contents-end" style={{width:"30vw", maxWidth:"500px", height:"auto"}}>
          <img src={logo} alt="manateewatch logo" style={{height:"100%", width:"auto", maxHeight:"600px"}}/>
        </Col>
        <Col style={{width:"70vw", height:"auto"}} className="headers">
          <h1>404 Error: Manatee's Not Found</h1>
          <h3>There's no manatees over here, you'll have to keep looking.</h3>
        </Col>
      </Row>
    </>
  );
}

export default ErrorPage;
