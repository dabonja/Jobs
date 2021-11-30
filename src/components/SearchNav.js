import React from 'react';
import Title from './Title'
const SearchNav = ({ onChange,onSubmit}) => {
    return (
        <div style={{position:'relative', top:"2rem"}} >
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