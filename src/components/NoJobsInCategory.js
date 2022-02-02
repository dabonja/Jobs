import React from 'react';

const NoJobsInCategory = ({ disp }) => {
  
    return (
        <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="jumbotron text-danger m-2 mt-5 pt-4" style={{ display: disp === true ? 'block' : 'none', fontSize: '1.5rem', backgroundColor: '' }}>
                <h1 className="display-6">Sorry, there are currently no jobs listed in that category.</h1>
                <p className="lead">You can get notifications on listed jobs by clicking the button down below.</p>
                <hr className="my-4" />
                <p>We will send you notifications as soon as new jobs get listed on our website.</p>
                <a className="btn btn-dark btn-lg" href="#" role="button">Notify me</a>
            </div>
        </div>
    )
}

export default NoJobsInCategory;