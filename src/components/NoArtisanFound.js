import React from 'react';

const NoArtisanFound =({name})=>{
return(
    <div className="col-5">
    <div className="jumbotron text-danger m-2 mt-5 pt-4 " style={{ fontSize: '1.5rem', backgroundColor: '' }}>
        <h1 className="display-6">Sorry, no artisan found under the name:  <b>{name}</b></h1>
     
    </div>
</div>
)
}

export default NoArtisanFound;