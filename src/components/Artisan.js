import React from 'react';
import mechanic from '../icons/mechanic.png';
import { Link } from 'react-router-dom';

const Artisan = ({ name, company, rated, profession, location, id, getId }) => {

    return (
        <div className=" list-inline-item mt-3 shadow p-3 mb-5 bg-body rounded">
            <div id={id} className="card" style={{ width: '18rem', backgroundColor: '#d9ffea' }}>
                <img src={mechanic} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="h5 fst-italic"> {name}</p>
                    <p className="card-text">Location: {location}</p>
                </div>
                <ul className="list-group list-group-flush" >
                    <li className="list-group-item">Rated: {rated === null ? 'Not rated' : rated}</li>
                    <li className="list-group-item">Company: {company}</li>
                    <li className="list-group-item">Profession: {profession}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <Link className="card-link" to="/ArtisanDetails" onClick={(e) => { getId(e) }} >Contact</Link>
                </div>
            </div>
        </div>
    )
}

export default Artisan;