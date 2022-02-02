import React from 'react';
import { Link,Navigate } from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import {useAuth0} from '@auth0/auth0-react';
import Profile from './Profile'
import Home from './Home';
const Navbar = () => {
  const {isAuthenticated} = useAuth0();
  return (
    <>
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark mb-5" style={{fontFamily: 'Gill Sans, sans-serif',fontSize: '1.3rem'}}>
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
              {
                isAuthenticated ? <Link className="nav-link " tabIndex="-1" to="/ArtisanForm">Register yourself</Link> : ''
              }
            </li>
            <li className="nav-item">
              {
               isAuthenticated ? <Link className="nav-link" to="/registercompany" tabIndex="-1" aria-disabled="true" >Register company</Link> : ''
              }
                </li>
           
            <li className="nav-item">
              {
                isAuthenticated ? <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true" >Logged user test link</Link>: ''
              }
            </li>
            
          </ul>
          <span> <Profile /></span>
          <form className="d-flex">
           {
             isAuthenticated ? <LogoutButton/> : <LoginButton/>
           }
          </form>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar