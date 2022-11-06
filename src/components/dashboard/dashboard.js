import React from "react";
import "./dashboard.css";
import Button from "@mui/material/Button";
export default function Dashboard() {
  return (
    <div>
      <div className="nav-bar flex">
        <div>
          <h3>Media Library</h3>
          <p>0 images</p>
        </div>
        <Button variant="contained">Upload new image</Button>
      </div>
      <div className="dashboard-elements flex">
        <img
          src="https://www.imsindia.com/ims-india/wp-content/themes/ims-india-new/img/404.png"
          alt="background-img"
        />
        <p>Click on 'Upload' to start adding images</p>
      </div>
    </div>
  );
}
