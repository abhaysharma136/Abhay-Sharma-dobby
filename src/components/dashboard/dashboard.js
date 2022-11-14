import React, { useState } from "react";
import "./dashboard.css";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function Dashboard() {

  const[openUploads,setOpenUploads]=useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgArr, setImageArr] = useState([
    "https://www.imsindia.com/ims-india/wp-content/themes/ims-india-new/img/404.png",
  ]);
  const imageHandleChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      handleOpenUploads()
    }
  };
  const renderphotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} key={photo} alt="images" />;
    });
  };

  const handleOpenUploads=()=>{
    setOpenUploads(true);
  }

  const handleCloseUploads=()=>{
    setOpenUploads(false);
    setSelectedImages([]);
  }

  const uploadStyles={
    display:openUploads?"block":"none",
  }
  return (
    <div>
      <div className="nav-bar flex">
        <div>
          <h3>Media Library</h3>
          <p>0 images</p>
        </div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={imageHandleChange}
          max="10"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload new image
          </Button>
        </label>
      </div>
      <div className="dashboard-elements flex">
        <img src={imgArr} alt="background-img" />
        <p>Click on 'Upload' to start adding images</p>

        
        <div className="preview-element-container flex" style={uploadStyles}>
          <div className="preview-header">
            <div>Upload new images</div>
            <div onClick={handleCloseUploads}>
              <CloseIcon />
            </div>
          </div>
          <div className="preview-contaner">
            <div className="flex">{renderphotos(selectedImages)}</div>
          </div>
          <div className="preview-btn flex">
          <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={imageHandleChange}
          max="10"
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span">
            Add more
          </Button>
        </label>
        <Button variant="contained">Upload</Button>
        </div>
        </div>
      </div>
    </div>
  );
}
