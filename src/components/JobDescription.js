import React from 'react';
import company from '../icons/company.png';
const JobDescription = ({category, name, contact, location,description}) => {
    return (
        <div className="list-inline-item" style={{marginTop: '10px'}}>
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
    )
}

export default JobDescription