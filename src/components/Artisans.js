import React from 'react';
import Artisan from './Artisan';
import Title from './Title';
import SearchNav from './SearchNav';
import { useEffect } from 'react'

const Artisans = ({ artisans, onChange, onSubmit, value }) => {
console.log(artisans);
    return <div className="container-fluid ">

        <SearchNav value={value} onChange={onChange} onSubmit={onSubmit} />
        <div className="row" align="center" style={{ position: 'relative', top: "4rem" }}>
            <div className="col">
                {
                    artisans.map((artisan, idx) => (
                        <Artisan key={idx} profession={artisan.profession} location={artisan.location} name={artisan.fullName} firm={artisan.company} rated={artisan.rated} contact={artisan.contact} />
                    ))
                }
            </div>
        </div>
    </div>


}
export default Artisans