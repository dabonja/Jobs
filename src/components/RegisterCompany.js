import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading';
import Selection from './Selection'
const RegisterCompany = ({ onSubmit,onChange, cat,handleChange }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (!isAuthenticated) {

        return <Loading />;
    }
    
    let jobTypes = cat && cat.map(job => job.category_name)
    let cats = [...new Set(jobTypes)];

    return (
        <div className="container w-50" style={{backgroundColor: '#FAFAFA'}}>
            <form onSubmit={onSubmit} className="p-3">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Company name</span>
                    <input name="company_name" type="text" className="form-control" placeholder="Company name" aria-label="Company name" aria-describedby="basic-addon1" onChange={onChange}/>
                </div>

                <div className="input-group mb-3">
                    <input name="location" type="text" className="form-control" placeholder="Location" aria-label="Location" aria-describedby="basic-addon2" onChange={onChange} />
                    <span className="input-group-text" id="basic-addon2">Location</span>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">Contact phone</span>
                    <input name="contact_phone" type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"  onChange={onChange} />
                </div>

                <div className="input-group mb-3">
                <Selection handleChange={onChange} categories={cats}  />
                </div>
                <div className="input-group">
                    <span className="input-group-text">Company description</span>
                    <textarea name="company_descrtiption" className="form-control" aria-label="With textarea"  onChange={onChange}></textarea>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-outline-dark mt-3 w-50" style={{position:"relative", left:'25%'}}>Confirm Registration</button>
                </div>

            </form>
        </div>
    )

}

export default RegisterCompany;