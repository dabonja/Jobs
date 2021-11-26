import React from 'react';

const Selection = ({jobTypes}) => {
    return (
        <div>
            <select className="form-select" aria-label="Default select example">
                <option selected>Izaberite trazeni posao...</option>
                {
                   jobTypes.map( (jobType,idx) =>(
                    <option key={idx} value={idx}>{jobType}</option>
                   )) 
                }
                
            </select>
        </div>
    )
}

export default Selection