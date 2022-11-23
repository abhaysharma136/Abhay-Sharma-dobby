import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './image.css';
export function Image() {
  const [imgArr, setImageArr] = useState([]);
  const {imgId}=useParams();
  let id = localStorage.getItem("id");
  function getUserImages() {
    const res = fetch(`http://localhost:4000/users2/${id}`, {
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
  return <div className="image-view-full flex">
    <img src={imgArr[imgId]?.src} alt="imgage" className="img-display"/>
    </div>;
}
