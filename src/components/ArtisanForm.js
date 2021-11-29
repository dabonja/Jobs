import React from 'react';

const ArtisanForm = ({ onChange, onSubmit }) => {

    return (
        <div className="d-flex justify-content-center">
            <div className="col-3">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" name="fullName" className="form-control" id="exampleInputEmail1" placeholder="Full name" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Firm</label>
                        <input type="text" name="company" className="form-control" id="exampleInputPassword1" placeholder="Firm" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Location</label>
                        <input type="text" name="location" className="form-control" id="exampleInputPassword1" placeholder="Location" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Contact phone</label>
                        <input type="number" name="contact" className="form-control" id="exampleInputPassword1" placeholder="Phone number" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Profession</label>
                        <input type="text" name="profession" className="form-control" id="exampleInputPassword1" placeholder="Profession" onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn btn-dark mt-2">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default ArtisanForm