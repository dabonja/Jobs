import React, { useEffect, useRef } from 'react';
import ArtisanDetails from './ArtisanDetails';


const RateArtisanForm = ({ onSubmit, onChange, submitted, ref }) => {
    const myRef = useRef(null);

    let content = '';
    useEffect(() => {
        //myRef.current.style.display = 'none';
        console.log('mounted');
        submitted = ''
        return () => {
            console.log('unmounted');
        }
    }, [])
    return (
        <div className="container" >

            <form onSubmit={onSubmit} ref={ref} style={{ width: '40rem' }}>
                <h3>Here you can leave a comment and rate an artisan.</h3>
                <div className="container border p-3" style={{ position: 'relative', top: '5rem' }}>

                    <div className="mb-3 ">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Enter rating...</label>
                        <input type="number" className="form-control" name="rating" id="exampleFormControlInput1" placeholder="rating..." onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter comment...</label>
                        <textarea className="form-control" name="comment" id="exampleFormControlTextarea1" rows="3" onChange={onChange} ></textarea>
                    </div>
                    <button className="btn btn-outline-dark">Submit</button>
                    <h4>{submitted}</h4>
                </div>

            </form>

        </div>

    )
}

export default RateArtisanForm

{
    /*
     
    */
}