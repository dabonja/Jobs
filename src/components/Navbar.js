import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark" style={{fontFamily: 'Gill Sans, sans-serif',fontSize: '1.3rem'}}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <h3 className="navbar-brand" style={{color: 'white',fontSize: '2rem'}}>Jobs</h3>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Artisans" >Artisans</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " tabIndex="-1" to="/ArtisanForm">Sign up for advertisment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true" >Sign your company for advertisment</Link>
            </li>
          </ul>
          <form className="d-flex">
            <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">Login</Link>
          </form>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar