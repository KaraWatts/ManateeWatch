import { Container, Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./stylesheets/FAQ.css";

function FAQs() {
  return (
    <Container className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-subtitle">Everything you need to know about using ManateeWatch</p>
      </div>

      <Accordion defaultActiveKey="0" className="faq-accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <strong>How do I install ManateeWatch on my iPhone?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <ol className="install-steps">
              <li>Open <strong>Safari</strong> and navigate to <a href="http://manateewatch.com" target="_blank" rel="noopener noreferrer">manateewatch.com</a></li>
              <li>Tap the <strong>Share</strong> button (square with arrow) at the bottom of your screen</li>
              <li>Scroll down and select <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong> to confirm</li>
            </ol>
            <div className="tip-box">
              <strong>💡 Tip:</strong> The app icon will appear on your home screen just like any other app!
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <strong>How do I install ManateeWatch on my Android device?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <ol className="install-steps">
              <li>Open <strong>Chrome</strong> and navigate to <a href="http://manateewatch.com" target="_blank" rel="noopener noreferrer">manateewatch.com</a></li>
              <li>Tap the <strong>menu</strong> (three dots) in the top right corner</li>
              <li>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
              <li>Tap <strong>"Install"</strong> or <strong>"Add"</strong> to confirm</li>
            </ol>
            <div className="tip-box">
              <strong>💡 Tip:</strong> You may see a banner at the bottom of the screen prompting you to install the app.
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <strong>What are the benefits of installing the app?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <ul className="benefits-list">
              <li><strong>🚀 Faster access:</strong> Launch directly from your home screen</li>
              <li><strong>📱 App-like experience:</strong> Full-screen mode without browser bars</li>
              <li><strong>🔄 Offline viewing:</strong> View previously loaded content without internet</li>
              <li><strong>🔔 Better performance:</strong> Optimized for mobile devices</li>
              <li><strong>💾 Less data usage:</strong> Cached content loads instantly</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <strong>I don't see the "Add to Home Screen" option. What should I do?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <div className="troubleshooting-content">
              <p>If you're having trouble finding the install option, try these steps:</p>
              <ul>
                <li>Make sure you're using <strong>Safari on iOS</strong> or <strong>Chrome on Android</strong></li>
                <li>Visit the site directly by typing the URL (not through a link from another app)</li>
                <li>Refresh the page and wait a few seconds for it to fully load</li>
                <li>On some Android devices, look for an "Install" banner at the bottom of the screen</li>
              </ul>
              <div className="help-note">
                <strong>Still need help?</strong> The website works perfectly in your browser too - no installation required!
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <strong>Is ManateeWatch free to use?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <p>Yes! ManateeWatch is completely free to use. Our mission is to help protect manatees by making sighting information accessible to everyone. There are no hidden fees or premium features.</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <strong>Do I need to create an account?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <p>You can browse manatee sightings without an account, but creating a free account allows you to:</p>
            <ul>
              <li>Report new manatee sightings</li>
              <li>Save your favorite locations</li>
              <li>Track your contributions to conservation efforts</li>
              <li>Participate in sighting challenges</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <strong>How do I get started using ManateeWatch?</strong>
          </Accordion.Header>
          <Accordion.Body>
            <p>We've created a comprehensive guide to help you get the most out of ManateeWatch! Our getting started guide covers:</p>
            <ul>
              <li>Step-by-step app installation</li>
              <li>How to explore and use the interactive map</li>
              <li>Reporting manatee sightings responsibly</li>
              <li>Important conservation guidelines and legal requirements</li>
              <li>Managing your profile and sightings</li>
            </ul>
            <div className="tip-box">
              <strong>📚 New to ManateeWatch?</strong> <Link to="/getting-started/">Check out our complete Getting Started Guide</Link> for everything you need to know!
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Card className="get-started-card">
        <Card.Body className="text-center">
          <h4>Ready to start exploring?</h4>
          <p>Join thousands of manatee enthusiasts in tracking these gentle giants</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/getting-started/" className="btn btn-outline-primary btn-lg">
              📚 Getting Started Guide
            </Link>
            <Link to="/" className="btn btn-primary btn-lg">
              🗺️ Explore Sightings
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FAQs;