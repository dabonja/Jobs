import React from 'react';
import Artisan from './Artisan';
import Title from './Title';
import SearchNav from './SearchNav';


const Artisans =({artisans,onChange,onSubmit,value})=>{
  console.log(artisans);
    return(
            <div className="container-fluid list-inline">
                <Title title="Ovde mozete unajmiti privatnog majstora!"/>
                <SearchNav value={value} onChange={onChange} onSubmit ={onSubmit}/>
                {
                    artisans.map( (artisan,idx) => (
                        <Artisan key={idx} profession={artisan.profession} location={artisan.location}  name={artisan.fullName} firm={artisan.firm}  rated={artisan.rated} contact={artisan.contact} />
                    ))
                }
            </div>
    )
}
export default Artisans