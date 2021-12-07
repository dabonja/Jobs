import React from 'react';
import Artisan from './Artisan';
import Title from './Title';
import SearchNav from './SearchNav';
import { useEffect } from 'react'

const Artisans = ({ artisans, onChange, onSubmit, value, selectArtisan, specificArtisan ,ratedArtisan}) => {

    if (specificArtisan.searchValue === undefined || specificArtisan.searchValue === '') {

        return <div className="container-fluid ">
            <SearchNav value={value} onChange={onChange} onSubmit={onSubmit} />
            <div className="row" align="center" style={{ position: 'relative', top: "4rem" }}>
                <div className="col">
                    {
                        artisans.map(artisan => (
                            <Artisan key={artisan.id} id={artisan.id} profession={artisan.profession} location={artisan.location} name={artisan.fullName} company={artisan.company} rated={artisan.rated} getId={selectArtisan}  getRatedArtisanId={ratedArtisan}/>
                        ))
                    }
                </div>
            </div>
        </div>
    } else {
        let filteredArtisans = artisans.filter(art => {
            return art.fullName === specificArtisan.searchValue;
        });
        return <div className="container-fluid ">
            <SearchNav value={value} onChange={onChange} onSubmit={onSubmit} />
            <div className="row" align="center" style={{ position: 'relative', top: "4rem" }}>
                <div className="col">
                    {
                        filteredArtisans.map(artisan => (
                            <Artisan key={artisan.id} id={artisan.id} profession={artisan.profession} location={artisan.location} name={artisan.fullName} company={artisan.company} rated={artisan.rated} getId={selectArtisan}  getRatedArtisanId={ratedArtisan}/>
                        ))
                    }
                </div>
            </div>
        </div>


    }



}
export default Artisans