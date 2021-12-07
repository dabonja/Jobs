import React from 'react';


const ArtisanCommentsAndRatings = ({ visibility, list }) => {
    if (list.length === 0) {

        return (
            <div style={{ positon: 'relative', top: '10px', display: visibility }}>
                <h3>No comments or ratings</h3>
            </div>
        )
    } else {

        return (
            <div className="list-group" style={{ positon: 'relative', top: '10px', display: visibility }}>
                <p>Comments:</p>
                {
                    list && list.map(item => (
                        <a href="#" key={item.id} className="list-group-item list-group-item-action active" aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <small> {item.comment}</small>
                            </div>
                        </a>
                    ))
                }
            </div>
        )
    }
}

export default ArtisanCommentsAndRatings