import { getDefaultNormalizer } from '@testing-library/dom';
import React from 'react';
import mechanic from '../icons/mechanic.png';
import ArtisanCommentsAndRatings from './ArtisanCommentsAndRatings'
import { useState, useEffect } from 'react';
import axios from 'axios';


const ArtisanDetails = ({ selectedArtisan }) => {

    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(null);
    const [commentsAndRatings, setCommentsAndRatings] = useState([]);
    useEffect(() => {
        setId(selectedArtisan.id)

    }, [])

    useEffect(() => {

    }, [commentsAndRatings])
    return (
        <div className="d-flex justify-content-center">
            <div className="card mb-3" style={{ maxWidth: " 70rem" }}  >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={mechanic} className="img-fluid rounded-start" alt="..." style={{ width: '30rem', height: '23rem' }} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{selectedArtisan.fullName}</h5>
                            <p className="card-text">Get in touch with this artisan! Number is below this text.</p>
                            <p className="card-text">Phone number: {selectedArtisan.contact}</p>
                            <p className="card-text">Profession: {selectedArtisan.profession}</p>
                            <p className="card-text">Location: {selectedArtisan.location}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <p className="card-text"><button onClick={() => {
                                setVisible(!visible)

                                axios
                                    .get(`http://localhost:3001/getcommentsandratings/${id}`, id)
                                    .then((data) => {
                                        let json = JSON.parse(data.request.response)
                                        setCommentsAndRatings(json)

                                    })
                                    .catch(err => {
                                        console.log(err.message);
                                    });

                            }} className="btn btn-outline-info" >{visible ? 'Hide comments and ratings' : 'Show comments and ratings'}</button></p>
                        </div>
                    </div>
                </div>

                <ArtisanCommentsAndRatings list={commentsAndRatings} visibility={visible ? 'block' : 'none'} />

            </div>
        </div>
    )
}

export default ArtisanDetails;