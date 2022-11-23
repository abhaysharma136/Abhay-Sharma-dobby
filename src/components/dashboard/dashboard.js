import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import storage from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { API } from "../../shared/global";


export default function Dashboard() {
  const navigate=useNavigate();
  const [openUploads, setOpenUploads] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgArr, setImageArr] = useState([]);

  const [imagePercentage, setImagePercentage] = useState(0);
  const [urlImage, setUrlImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const imageHandleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setPreviewImage((prevState) => [
        ...prevState,
        URL.createObjectURL(e.target.files[i]),
      ]);
      newImage["id"] = Math.random();
      setSelectedImages((prevState) => [...prevState, newImage]);
    }

    handleOpenUploads();
  };
  console.log(previewImage);
  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);
  const renderphotos = (previewImage) => {
    return previewImage.map((photo, i) => {
      return <img src={photo} key={i} alt="images" />;
    });
  };

  const handleOpenUploads = () => {
    setOpenUploads(true);
  };

  const handleCloseUploads = () => {
    setOpenUploads(false);
    setSelectedImages([]);
    setPreviewImage([]);
  };

  const uploadStyles = {
    display: openUploads ? "block" : "none",
  };

  function handleImageUpload() {
    const promises = [];
    selectedImages.map((image, i) => {
      const storageRef = ref(storage, `/files/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const selectedImagespercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          //upload progress
          setImagePercentage(selectedImagespercent);
        },
        (err) => console.log(err),
        async () => {
          //download URL
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrlImage((prevState) => [...prevState, url]);
            handleCloseUploads();
          });
        }
      );
      return i;
    });
    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  }
  console.log(urlImage);

  useEffect(() => {
    if (urlImage.length > 0) {
      UpdateImageArrar(urlImage);
    }
  }, [urlImage]);

  let id = localStorage.getItem("id");

  function UpdateImageArrar(imgArr) {
    imgArr.map((img) => {
      fetch(`${API}/users2/${id}`, {
        method: "PUT",
        body: JSON.stringify({imgID:imgArr.length, src: img }),
        headers: {
          "content-type": "application/json",
        },
      });
      return img;
    });
  }

  function getUserImages() {
    const res = fetch(`${API}/users2/${id}`, {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "content-type": "application/json",
      },
    });
    res.then((data) => data.json()).then((mvs) => setImageArr(mvs.imgArr));
  }

  useEffect(() => {
    getUserImages();
  }, []);

  console.log(imgArr);

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("message");
    navigate(`/`);
  };
  useEffect(() => {
    let isAuth = localStorage.getItem("token");
    if (isAuth === false || isAuth == null) {
      navigate("/");
    }
  });


  
  return (
    <div>
      <div className="nav-bar flex">
        <div>
          <h3>Media Library</h3>
          <p>{imgArr.length} images</p>
        </div>
        <div className="flex button-container-dashboard">
          <Button variant="outlined" onClick={()=>Logout()}>LogOut</Button>
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
        
      </div>
      <div className="dashboard-elements flex">
        <div className="flex img-container">
          {imgArr.length === 0 ? (
            <DisplayNoImage/>
          ) : (
            ""
          )}
          {imgArr.map((img,index) => (
            <DisplayImg img={img} key={index} imgid={index} />
          ))}
        </div>

        <div className="preview-element-container flex" style={uploadStyles}>
          <div className="preview-header">
            <div>Upload new images</div>
            <div onClick={handleCloseUploads}>
              <CloseIcon />
            </div>
          </div>
          <div className="preview-contaner">
            <div className="flex">{renderphotos(previewImage)}</div>
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
            <Button variant="contained" onClick={handleImageUpload}>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayImg({ img, imgid }) {
  let id = localStorage.getItem("id");
  const navigate=useNavigate();
  const deleteImg=(imgId)=>{
    const data={
      "imgID":imgId
    }
    fetch(`${API}/users2/remove/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
  }
  return (
    <div className="img-box flex">
      <img src={img.src} alt="img" className="img-dashboard" onClick={()=>navigate(`/image/${id}/${imgid}`)}/>
        <div onClick={()=>deleteImg(imgid+1)}><DeleteIcon/></div>
    </div>
  );
}

function DisplayNoImage() {
  return (
    <div className="dashboard-elements flex">
      <img
        src="https://www.imsindia.com/ims-india/wp-content/themes/ims-india-new/img/404.png"
        alt="background-img"
      />
      <p>Click on 'Upload' to start adding images</p>
    </div>
  );
}
