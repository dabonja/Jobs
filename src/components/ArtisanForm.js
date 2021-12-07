import React from 'react';
import Title from './Title';

const ArtisanForm = React.forwardRef(({ onChange, onSubmit, disp }, ref) => (

    <div className="d-flex justify-content-center" style={{ position: 'relative', top: '6rem' }}>
        <div className="col-3">
            <form onSubmit={onSubmit} ref={ref} className=" border p-5">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" name="fullname" className="form-control" id="fullname" placeholder="Full name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Company</label>
                    <input type="text" name="company" className="form-control" id="company" placeholder="Company" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Location</label>
                    <input type="text" name="location" className="form-control" id="location" placeholder="Location" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contact phone</label>
                    <input type="number" name="contact" className="form-control" id="contact" placeholder="Phone number" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Profession</label>
                    <input type="text" name="profession" className="form-control" id="profession" placeholder="Profession" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn btn-dark mt-2">Submit</button>
            </form>
            <div style={{ marginTop: '10px', display: disp }} >
                <Title title="Uspesna prijava." />
            </div>
        </div>
    </div>
))


export default ArtisanForm