import React from 'react';

const SearchNav = ({value, onChange,onSubmit}) => {
    return (
        <div>
            <nav className="navbar navbar-light ">
                <form className="container" onSubmit={onSubmit}>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">Pretrazi poslove</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"  onChange={onChange}/>
                    </div>
                </form>
            </nav>
        </div>
    )
}

export default SearchNav