import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../../components/dashboard/dashboard";
import Login from "../../components/login/login";
import Register from "../../components/register/register";
import Error404 from "../ErrorScreen/error404";

import "./home.css";
export default function Home() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/404" element={<Error404/>}/>
        </Routes>
      </Router>
    </div>
  );
}
