import { getDefaultNormalizer } from '@testing-library/dom';
import React from 'react';
import mechanic from '../icons/mechanic.png';
const ArtisanDetails = ({ selectedArtisan }) => {

    return (
        <div className="d-flex justify-content-center" style={{ position: 'relative', top: '8rem' }}>
            <div className="card mb-3" style={{ maxWidth: " 70rem" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={mechanic} className="img-fluid rounded-start" alt="..." style={{ width: '230rem', height: '20rem' }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{selectedArtisan.fullName}</h5>
                            <p className="card-text">Get in touch with this artisan! Number is below this text.</p>
                            <p className="card-text">Phone number: {selectedArtisan.contact}</p>
                            <p className="card-text">Profession: {selectedArtisan.profession}</p>
                            <p className="card-text">Location: {selectedArtisan.location}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <p className="card-text"><a href="#" >View all comments and rating</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtisanDetails;