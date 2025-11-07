import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./stylesheets/gettingStarted.css";

function GettingStarted() {
  return (
    <Container className="getting-started-container">
      <div className="getting-started-header">
        <h1>Getting Started with ManateeWatch</h1>
        <p className="subtitle">Your guide to protecting manatees through responsible observation</p>
      </div>

      <Alert variant="warning" className="protection-alert">
        <Alert.Heading>🛡️ Marine Mammal Protection Act</Alert.Heading>
        <p>
          <strong>Important:</strong> Under the Marine Mammal Protection Act, it is illegal to harass, hunt, capture, or kill manatees. 
          You must maintain a distance of at least <strong>150 feet (50 yards)</strong> from manatees at all times. 
          Enjoy observing these gentle giants without interfering with their natural behaviors or disrupting their environment.
        </p>
        <hr />
        <p className="mb-0">
          <strong>Report violations:</strong> Call the Florida Fish and Wildlife Conservation Commission at 1-888-404-3922
        </p>
      </Alert>

      <Row className="mb-4">
        <Col lg={6}>
          <Card className="step-card">
            <Card.Header>
              <h3>📱 Step 1: Install the App</h3>
            </Card.Header>
            <Card.Body>
              <h5>On iPhone (iOS):</h5>
              <ol>
                <li>Open <strong>Safari</strong> and visit manateewatch.com</li>
                <li>Tap the <strong>Share</strong> button at the bottom</li>
                <li>Select <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>"Add"</strong> to confirm</li>
              </ol>
              
              <h5 className="mt-3">On Android:</h5>
              <ol>
                <li>Open <strong>Chrome</strong> and visit manateewatch.com</li>
                <li>Tap the <strong>menu</strong> (three dots) in the top right</li>
                <li>Select <strong>"Add to Home screen"</strong></li>
                <li>Tap <strong>"Install"</strong> to confirm</li>
              </ol>
              
              <div className="tip-box">
                💡 <strong>Tip:</strong> Installing the app gives you faster access and works offline!
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="step-card">
            <Card.Header>
              <h3>🗺️ Step 2: Explore Sightings</h3>
            </Card.Header>
            <Card.Body>
              <p>Use the interactive map to discover recent manatee sightings in your area:</p>
              <ul>
                <li><strong>Click markers</strong> on the map to see sighting details</li>
                <li><strong>Browse recent sightings</strong> in the sidebar (desktop only)</li>
                <li><strong>Get directions</strong> to sighting locations</li>
                <li><strong>View photos</strong> and activity details</li>
              </ul>
              
              <div className="navigation-tip">
                <strong>🧭 Find Your Location:</strong> Tap the compass icon in the bottom right to center the map on your current location.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6}>
          <Card className="step-card">
            <Card.Header>
              <h3>📸 Step 3: Report a Sighting</h3>
            </Card.Header>
            <Card.Body>
              <p>When you spot a manatee (remember: stay 150 feet away!):</p>
              <ol>
                <li><strong>Click the "Report Manatee" button</strong> on the map (floating icon)</li>
                <li><strong>Take a photo</strong> using the camera or upload an existing photo</li>
                <li><strong>Add location details</strong> - the app will use your current location</li>
                <li><strong>Provide sighting information:</strong>
                  <ul>
                    <li>Number of adults and calves</li>
                    <li>Activity (swimming, feeding, resting, etc.)</li>
                    <li>Date and time</li>
                    <li>Additional comments</li>
                  </ul>
                </li>
                <li><strong>Submit your sighting</strong> to help track manatee populations</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="step-card">
            <Card.Header>
              <h3>👤 Step 4: View Your Profile</h3>
            </Card.Header>
            <Card.Body>
              <p>Track your conservation contributions:</p>
              <ul>
                <li><strong>View all your sightings</strong> in one place</li>
                <li><strong>See your impact</strong> on manatee conservation</li>
                <li><strong>Edit or delete</strong> your sighting reports</li>
                <li><strong>Share your sightings</strong> with other observers</li>
              </ul>
              
              <p className="mt-3">
                <strong>Access your profile:</strong> Click your avatar in the top right corner and select "Profile Page"
              </p>
              
              <div className="community-note">
                🤝 <strong>Join the Community:</strong> Your sightings help researchers and conservationists protect manatees for future generations.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="conservation-card">
        <Card.Body>
          <h3>🌊 Conservation Guidelines</h3>
          <Row>
            <Col md={6}>
              <h5>Do:</h5>
              <ul className="do-list">
                <li>Maintain 150+ feet distance from manatees</li>
                <li>Observe quietly and calmly</li>
                <li>Report sightings to help conservation efforts</li>
                <li>Use telephoto lenses for close-up photos</li>
                <li>Follow posted speed zones when boating</li>
                <li>Report injured or distressed manatees</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Don't:</h5>
              <ul className="dont-list">
                <li>Touch, feed, or give water to manatees</li>
                <li>Chase or follow manatees</li>
                <li>Make loud noises or sudden movements</li>
                <li>Separate mothers from calves</li>
                <li>Enter water where manatees are present</li>
                <li>Use flash photography in dim conditions</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="get-started-action">
        <h3>Ready to start protecting manatees?</h3>
        <p>Begin exploring sightings and contributing to manatee conservation today!</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Explore the Map
        </Link>
      </div>
    </Container>
  );
}

export default GettingStarted;