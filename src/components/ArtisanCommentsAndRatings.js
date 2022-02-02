import React from 'react';


const ArtisanCommentsAndRatings = ({ visibility, list }) => {
    if (list.length === 0) {
        return (
            <div style={{  display: visibility, maxWidth: '50rem', margin: 'auto',backgroundColor:'#f6f6f8'}}>
                <h5 style={{ fontFamily: 'Century Gothic' }}>No comments or ratings</h5>
            </div>
        )
    } else {
        return (

            <div style={{ display: visibility, maxWidth: '50rem', margin: 'auto',backgroundColor:'#f6f6f8' }}>
                <h5 style={{backgroundColor:'#f6f6f8'}} align="center">Comments:</h5>
                <div className="list-group list-group-flush">
                    {
                        list && list.map(item => (
                            <li key={item.id} className="list-group-item " aria-current="true" style={{backgroundColor:'#f6f6f8'}}>
                                <div className="d-flex w-100 justify-content-between" >
                                    <small style={{ fontFamily: 'Century Gothic' }} > {item.comment}</small>
                                </div>
                            </li>
                        ))
                    }
                </div>
            </div>

        )
    }
}

export default ArtisanCommentsAndRatings