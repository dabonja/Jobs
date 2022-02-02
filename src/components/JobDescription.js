import React from 'react';
import company from '../images/construction.jpg';
const JobDescription = ({ category, name, contact, location, description }) => {
    return (
        //ovde proveri, responsivnost ne radi zbog zadatih klasa
        <>
            <div className="col-lg-5 col-md-4 col-sm-2">
                <div className="card mb-3" style={{ height: '15.8rem' }} >
                    <div className="row">
                        <div className="col-md-4 ">
                            <img src={company} alt="..." style={{ width: '200', height: '150' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body wrapper">
                                <p className="demo-1" >{description}</p>
                                <p className="card-text">Company name: {name}</p>
                                <p className="card-text">Location: {location}</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDescription

{
    /*
     <div className="list-inline-item col-3" style={{marginTop: '10px'}}>
            <div className="card" style={{width:"18rem "}}>
                <img src={company} className="card-img-top" alt="..."/>
                <div className ="card-body">
                <h5 className ="card-title">{name}</h5>
                <p className ="card-text">{description}</p>
                <p className ="card-text">Location: {location}</p>
                <h3 className ="card-title">{category}</h3>
                <a href="#" className ="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    */
}