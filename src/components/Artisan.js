import React from 'react';
import mechanic from '../icons/mechanic.png'

const Artisan = ({ name, firm, rated, contact, location }) => {
    return (
       
        <div className=" list-inline-item mt-3 shadow p-3 mb-5 bg-body rounded">
            <div className="card" style={{ width: '18rem' }}>
                <img src={mechanic} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Full name: {name}</h5>
                    <p className="card-text">Location: {location}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Rated: {rated} / 10</li>
                    <li className="list-group-item">Firm: {firm}</li>
                    <li className="list-group-item">Contact phone: {contact}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>

        </div>

    )
}

export default Artisan;