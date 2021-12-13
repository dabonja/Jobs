import React, { useEffect, useRef } from 'react';
import ArtisanDetails from './ArtisanDetails';


const RateArtisanForm = ({ onSubmit, onChange, submitted, ref, targetArtisan }) => {
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
       
            <div className="row mt-5 ">
                <div className="col">
                    <form onSubmit={onSubmit} ref={ref} style={{ width: '40rem', marginLeft: '4rem' }}>
                   
                        <div className="container border p-3">

                            <div className="mb-3 ">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter rating...</label>
                                <input type="number" className="form-control" name="rating" id="exampleFormControlInput1" placeholder="rating..." onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter comment...</label>
                                <textarea className="form-control" name="comment" id="exampleFormControlTextarea1" rows="3" placeholder="Comment is optional..." onChange={onChange} ></textarea>
                            </div>
                            <button className="btn btn-outline-dark">Submit</button>
                            <h4>{submitted}</h4>
                        </div>

                    </form>
                       
                    </div>
                <div className="col"><ArtisanDetails selectedArtisan={targetArtisan} /></div>
            </div>


    )
}

export default RateArtisanForm

{
    /*
     
    */
}