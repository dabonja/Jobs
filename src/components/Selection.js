import React from 'react';

const Selection = ({ handleChange, categories }) => {
    
    return (
        <div className="col-lg-8">
        <select name="category_id" className="form-select mt-5 mb-5 " aria-label="Default select example" onChange={handleChange} >
            <option defaultValue="selected" id={-1} >Choose the right work for you...</option>
            {
                categories.map((jobType, idx) => (
                    <option key={idx} value={jobType.category_name}>{jobType}</option>
                ))
            }
        </select>
        </div>
    )
}

export default Selection