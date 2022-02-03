import React from 'react';
import Artisan from './Artisan';
import SearchNav from './SearchNav';
import { useEffect } from 'react'
import ErrorFallback from '../error_boundaries/ErrorFallback';
import NoArtisanFound from './NoArtisanFound';

const Artisans = ({ artisans, onChange, onSubmit, value, selectArtisan, specificArtisan, ratedArtisan }) => {
    let filteredArtisans = []
    useEffect(() => {
        filteredArtisans = [...artisans] 
    }, [specificArtisan.searchValue])
    /*
        Razmisli o postavljanju try catch bloka
    */
    if (specificArtisan.searchValue === undefined || specificArtisan.searchValue === '') {
        return <div className="container-fluid" >
            <SearchNav value={value} onChange={onChange} onSubmit={onSubmit} />
            <div className="row" align="center" style={{ position: 'relative', top: "4rem" }}>
                <div className="col">
                    {
                        artisans.map((artisan,idx )=> (
                            <Artisan key={idx} id={artisan.id} profession={artisan.profession} location={artisan.location} name={artisan.fullName} company={artisan.company} rated={artisan.rated} getId={selectArtisan} getRatedArtisanId={ratedArtisan} />
                        ))
                    }
                </div>
            </div>
        </div>
    }
    else {
        filteredArtisans = artisans.filter(art => {
         return   art.fullName.toLowerCase().includes(specificArtisan.searchValue.toLowerCase());
    
           // return art.fullName === specificArtisan.searchValue;
        });
        return <div className="container-fluid ">
            <SearchNav value={value} onChange={onChange} onSubmit={onSubmit} />
            <div className="row" align="center" style={{ position: 'relative', top: "4rem" }}>
            
                <div className="col">
                    {
                        filteredArtisans.length === 0 ? <NoArtisanFound name={specificArtisan.searchValue} />:
                        filteredArtisans.map((artisan,idx) => (
                            <Artisan key={idx} id={artisan.id} profession={artisan.profession} location={artisan.location} name={artisan.fullName} company={artisan.company} rated={artisan.rated} getId={selectArtisan} getRatedArtisanId={ratedArtisan} />
                        ))
                    }
                </div>
            </div>
        </div>
    }
}
export default Artisans