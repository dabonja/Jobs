import React from 'react';
import Artisan from './Artisan';
import Title from './Title';
import SearchNav from './SearchNav';
import { useEffect } from 'react'

const Artisans = ({ artisans, onChange, onSubmit, value ,selectArtisan}) => {
  
    return <div className="container-fluid ">

        <SearchNav value={value} onChange={onChange} onSubmit={onSubmit} />
        <div className="row" align="center" style={{ position: 'relative', top: "4rem" }}>
            <div className="col">
                {
                    artisans.map(artisan => (
                        <Artisan key={artisan.id} id={artisan.id} profession={artisan.profession} location={artisan.location} name={artisan.fullName} company={artisan.company} rated={artisan.rated} getId={selectArtisan}/>
                    ))
                }
            </div>
        </div>
    </div>


}
export default Artisans