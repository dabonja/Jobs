import React from 'react';
import Title from './Title'
const SearchNav = ({ onChange,onSubmit}) => {
    return (
        <div className="col-lg-8 col-md-6 col-sm-3 d-flex justify-content-center">
            <nav className="navbar navbar-light ">
                <form className="container" onSubmit={onSubmit}>
                <Title title="Find the right artisan for you." />
                    <div className="input-group border">
                        <span className="input-group-text" id="basic-addon1">Search Artisans</span>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"  onChange={onChange}/>
                    </div>
                </form>
            </nav>
        </div>
    )
}

export default SearchNav