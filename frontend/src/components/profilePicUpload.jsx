import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { api } from './utilities';
import { Image, Button, Card, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './stylesheets/profilePicUpload.css';

function ImageUploadAndCrop({ profile_picture }) {
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState(profile_picture);
    const [isUploading, setIsUploading] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const editorRef = useRef();
    const fileInputRef = useRef();
    const user = JSON.parse(localStorage.getItem("user"));
    const { profileId } = useParams();

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select a valid image file (JPG, PNG, GIF)');
                return;
            }
            
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('Image file must be smaller than 5MB');
                return;
            }
            
            setUploadError('');
            setImage(URL.createObjectURL(file));
            setShowEditor(true);
        }
    };

    const handleSave = async () => {
        if (editorRef.current) {
            setIsUploading(true);
            try {
                const canvasScaled = editorRef.current.getImageScaledToCanvas();
                const croppedImage = canvasScaled.toDataURL('image/png');
                
                const response = await api.put("profile/", { profile_picture: croppedImage });
                console.log('Successfully uploaded profile picture', response.data);
                
                setImage(null);
                setShowEditor(false);
                setProfilePic(croppedImage);
                setUploadError('');
                
                // Update user data in localStorage
                const updatedUser = { ...user, profile_picture: croppedImage };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                setUploadError('Failed to upload profile picture. Please try again.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleCancel = () => {
        setImage(null);
        setShowEditor(false);
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const isOwner = user.id === parseInt(profileId);

    return (
        <div className="profile-pic-upload-container">
            {profilePic ? (
                <div className="profile-pic-display">
                    <div className="profile-pic-wrapper">
                        <Image
                            src={profilePic}
                            alt="Profile Picture"
                            className="profile-picture"
                        />
                        {isOwner && (
                            <div className="profile-pic-overlay" onClick={triggerFileInput}>
                                <div className="overlay-content">
                                    <i className="upload-icon">📷</i>
                                    <span>Change Photo</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {isOwner && (
                        <p className="upload-hint">Click on your photo to change it</p>
                    )}
                </div>
            ) : isOwner ? (
                <Card className="upload-placeholder">
                    <Card.Body className="text-center" onClick={triggerFileInput}>
                        <div className="upload-placeholder-content">
                            <i className="upload-icon-large">👤</i>
                            <h5>Add Photo</h5>
                            <Button variant="primary" size="sm">
                                Upload
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <div className="no-profile-pic">
                    <div className="default-avatar">👤</div>
                    <p className="text-muted">No profile picture</p>
                </div>
            )}

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={onSelectFile}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* Error Alert */}
            {uploadError && (
                <Alert variant="danger" className="mt-2" dismissible onClose={() => setUploadError('')}>
                    {uploadError}
                </Alert>
            )}

            {/* Image Editor Modal */}
            {showEditor && image && (
                <div className="editor-modal">
                    <div className="editor-content">
                        <Card>
                            <Card.Header>
                                <h5 className="mb-0">Crop Your Profile Picture</h5>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <AvatarEditor
                                    ref={editorRef}
                                    image={image}
                                    width={250}
                                    height={250}
                                    border={20}
                                    borderRadius={125}
                                    color={[255, 255, 255, 0.6]}
                                    scale={1}
                                    className="avatar-editor"
                                />
                                <p className="text-muted mt-2 mb-3">
                                    Drag to reposition • Your photo will be cropped to a circle
                                </p>
                                <div className="editor-buttons">
                                    <Button 
                                        variant="secondary" 
                                        onClick={handleCancel}
                                        disabled={isUploading}
                                        className="me-2"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        onClick={handleSave}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Saving...' : 'Save Photo'}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUploadAndCrop;
  