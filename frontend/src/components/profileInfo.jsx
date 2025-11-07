import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Collapse } from "react-bootstrap";
import ImageUploadAndCrop from "./profilePicUpload";
import "./stylesheets/profileInfo.css";

function ProfileInfo({ id, display_name, profile_picture, ranking, num_sightings, sightings}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const lastSighting = () => {
    if (sightings.length > 0 && sightings[num_sightings - 1]['sighting_date']) {
      return sightings[num_sightings - 1]['sighting_date'].slice(0, 10);
    }
    return "Still Looking";
  }

  const formatDate = (dateString) => {
    if (dateString === "Still Looking") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  return (
    <Container className="profile-info-container">
      <Card className="profile-card">
        <Card.Body>
          {/* Mobile Toggle Button */}
          <div className="d-block d-md-none">
            <div className="mobile-header">
              <div className="d-flex align-items-center mb-2">
                <div className="mobile-profile-pic">
                  <ImageUploadAndCrop profile_picture={profile_picture} />
                </div>
                <h2 className="profile-name-mobile">{display_name}</h2>
              </div>
              <div className="text-center">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-controls="profile-stats"
                  aria-expanded={isExpanded}
                  className="toggle-btn"
                >
                  {isExpanded ? 'Hide Stats' : 'Show Stats'}
                  <i className={`ms-1 fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                </Button>
              </div>
            </div>
            
            <Collapse in={isExpanded}>
              <div id="profile-stats">
                <Row className="stats-grid mt-3">
                  <Col xs={6} className="stat-item">
                    <div className="stat-card">
                      <div className="stat-number">{num_sightings}</div>
                      <div className="stat-label">Manatees Sighted</div>
                    </div>
                  </Col>
                  
                  <Col xs={6} className="stat-item">
                    <div className="stat-card secondary">
                      <div className="stat-number">{sightings.length}</div>
                      <div className="stat-label">Total Reports</div>
                    </div>
                  </Col>
                  
                  <Col xs={6} className="stat-item">
                    <div className="stat-card secondary">
                      <div className="stat-number">
                        {sightings.length > 0 ? 
                          Math.round((sightings.length / 30) * 10) / 10 : 0}
                      </div>
                      <div className="stat-label">Reports/Month</div>
                    </div>
                  </Col>
                  
                  <Col xs={6} className="stat-item">
                    <div className="stat-card">
                      <div className="stat-number">{formatDate(lastSighting())}</div>
                      <div className="stat-label">Last Sighting</div>
                    </div>
                  </Col>
                  
                  <Col xs={12} className="stat-item">
                    <div className="stat-card">
                      <div className="stat-number">#{ranking}</div>
                      <div className="stat-label">Ranking</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Collapse>
          </div>

          {/* Desktop Layout */}
          <div className="d-none d-md-block">
            <Row className="align-items-center">
              {/* Profile Picture Section */}
              <Col md={4} className="text-center profile-picture-section">
                <div className="profile-picture-wrapper">
                  <ImageUploadAndCrop profile_picture={profile_picture} />
                </div>
              </Col>
              
              {/* Statistics Section */}
              <Col md={8}>
                <h2 className="profile-name">{display_name}</h2>
                <Row className="stats-grid">
                  <Col sm={4} className="stat-item">
                    <div className="stat-card">
                      <div className="stat-number">{num_sightings}</div>
                      <div className="stat-label">Manatees Sighted</div>
                    </div>
                  </Col>
                  
                  <Col sm={4} className="stat-item">
                    <div className="stat-card secondary">
                      <div className="stat-number">{sightings.length}</div>
                      <div className="stat-label">Total Reports</div>
                    </div>
                  </Col>
                  
                  <Col sm={4} className="stat-item">
                    <div className="stat-card secondary">
                      <div className="stat-number">
                        {sightings.length > 0 ? 
                          Math.round((sightings.length / 30) * 10) / 10 : 0}
                      </div>
                      <div className="stat-label">Reports/Month</div>
                    </div>
                  </Col>
                </Row>
                
                {/* Additional Info Row */}
                <Row className="additional-stats">
                  <Col sm={6} className="stat-item">
                    <div className="stat-card">
                      <div className="stat-number">{formatDate(lastSighting())}</div>
                      <div className="stat-label">Last Sighting</div>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="stat-item">
                    <div className="stat-card">
                      <div className="stat-number">#{ranking}</div>
                      <div className="stat-label">Ranking</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfileInfo;
