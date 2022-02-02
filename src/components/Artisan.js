import React from 'react';
import mechanic from '../images/artisan.jpg';
import { Link } from 'react-router-dom';

const Artisan = ({ name, company, rated, profession, location, id, getId, getRatedArtisanId }) => {

    return (
        <div className=" list-inline-item mt-3 p-2 shadow mb-5 bg-body rounded">
            <div id={id} className="card" style={{width: '18rem', backgroundColor: ' #f2f2f2' }}>
                <img src={mechanic} className="card-img-top" alt="..." style={{ maxHeight:'18rem',}} />
                <div className="card-body">
                    <p className="h5 fst-italic m-0 "> {name}</p>
                   <small>{profession}</small>
                </div>
                <ul className="list-group list-group-flush" >
                    <li className="list-group-item"  ><p className="m-0 w-75" align="left"><small>Rated: {rated === null ? 'Not rated' : rated}</small></p></li>
                    <li className="list-group-item"><p className="m-0 w-75"  align="left"><small>Company: {company}</small></p></li>
                    <li className="list-group-item"><p className="m-0 w-75"  align="left"><small>Location: {location}</small></p></li>
               
                </ul>
                <div className="card-body">
                    <Link className="card-link btn btn-outline-dark " to="/RateArtisan" onClick={(e) => { getRatedArtisanId(e) }} >Rate artisan</Link>
                    <Link className="card-link btn btn-outline-dark" to="/ArtisanDetails" onClick={(e) => { getId(e) }} >Contact</Link>
                </div>
            </div>


        </div>
    )
}

export default Artisan;