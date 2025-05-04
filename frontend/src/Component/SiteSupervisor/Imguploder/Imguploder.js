import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../../bottomnav/foter";
import { FaTrash, FaUpload } from "react-icons/fa";
import "./files/Imguploder.css";

function Imguploder() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const submitImg = async (e) => {
    e.preventDefault();
    if (!image) {
      setUploadError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setIsUploading(true);
      const response = await axios.post(
        "http://localhost:5000/uploadImg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      if (response.data.status === "ok") {
        setUploadError(null);
        getImage();
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const getImage = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getImage");
      if (response.data.status === "ok") {
        setAllImage(response.data.data);
      } else {
        console.error("Error fetching images:", response.data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteImage = async (id, imageName) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteImage/${id}`
      );
      
      if (response.data.status === "ok") {
        setDeleteStatus({ success: true, message: "Image deleted successfully" });
        setTimeout(() => setDeleteStatus(null), 3000);
        getImage();
      } else {
        setDeleteStatus({ success: false, message: response.data.message || "Deletion failed" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteStatus({ 
        success: false, 
        message: error.response?.data?.message || "Failed to delete image" 
      });
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="uploader-page-wrapper">
      <Navbar />
      <div className="uploader-container">
        <h1 className="uploader-title">Image Uploader</h1>
        
        {/* Upload Form */}
        <div className="upload-form-container">
          <form onSubmit={submitImg} className="upload-form">
            <div className="form-group">
              <label>Choose an image to upload</label>
              <input
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setUploadError(null);
                }}
                required
                className="file-input"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isUploading}
              className="upload-button"
            >
              {isUploading ? (
                <span className="upload-spinner"></span>
              ) : (
                <>
                  <FaUpload className="button-icon" />
                  Upload
                </>
              )}
            </button>
          </form>
        </div>

        {/* Status Messages */}
        {uploadError && (
          <div className="error-message">
            {uploadError}
          </div>
        )}
        {deleteStatus && (
          <div className={`status-message ${deleteStatus.success ? 'success' : 'error'}`}>
            {deleteStatus.message}
          </div>
        )}

        {/* Image Gallery */}
        <h2 className="gallery-title">Your Images</h2>
        {allImage.length > 0 ? (
          <div className="image-gallery">
            {allImage.map((data) => (
              <div key={data._id} className="image-card">
                <div className="image-container">
                  <img
                    src={`http://localhost:5000/files/${data.Image}`}
                    alt={`Uploaded ${data.Image}`}
                    onError={(e) => {
                      e.target.src = "fallback-image-url";
                    }}
                  />
                  <button
                    className="delete-image-button"
                    onClick={() => deleteImage(data._id, data.Image)}
                    title="Delete image"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-images-message">
            No images uploaded yet.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Imguploder;
