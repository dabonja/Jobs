import React from 'react';
import Title from './Title'
const SearchNav = ({value, onChange,onSubmit}) => {
    return (
        <div style={{position:'relative', top:"2rem"}} >
            <nav className="navbar navbar-light ">
                <form className="container" onSubmit={onSubmit}>
                <Title title="Pronadjite sebi majstora." />
                    <div className="input-group border">
                        <span className="input-group-text" id="basic-addon1">Pretrazi majstore</span>
                        <input type="text" className="form-control" placeholder="Pretraga" aria-label="Pretraga" aria-describedby="basic-addon1"  onChange={onChange}/>
                    </div>
                </form>
            </nav>
        </div>
    )
}

export default SearchNav