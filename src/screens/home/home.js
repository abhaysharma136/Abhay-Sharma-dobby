import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/dashboard/dashboard";
import Login from "../../components/login/login";
import Register from "../../components/register/register";
import Error404 from "../ErrorScreen/error404";

import "./home.css";
import { Image } from "./Image";
export default function Home() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/image/:id/:imgId" element={<Image />} />
      </Routes>
    </div>
  );
}
