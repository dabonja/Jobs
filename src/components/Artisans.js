import React from 'react';
import Artisan from './Artisan';
import Title from './Title';

const Artisans =({artisans})=>{
    console.log(artisans);
    return(
            <div className="container-fluid list-inline">
                <Title title="Ovde mozete unajmiti privatnog majstora!"/>
                {
                    artisans.map( artisan => (
                        <Artisan location={artisan.location}  name={artisan.fullName} firm={artisan.firm}  rated={artisan.rated} contact={artisan.contact} />
                    ))
                }
            </div>
    )
}
export default Artisans