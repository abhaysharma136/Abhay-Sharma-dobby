import React from 'react'
import './error404.css';
import Button from "@mui/material/Button";

export default function Error404() {
  return (
    <div className='Error404-container flex'>
        <p className='Error404'>404</p>
        <p>oops! looks like you are lost.</p>
        <p>The page you are looking for could not be found.</p>
        <Button variant="contained">Back to home</Button>
    </div>
  )
}
