import React from 'react';

const Alert = ({sent,show}) => {

    return (
        <div className="container-fluid w-25 mt-3" style={{display:show}}>
        {
            sent ? 
            <div className="alert alert-info" role="alert" style={{display: sent ? 'block' : 'none'}} >
                 Your data has been sent.</div> :  
            
            <div className="alert alert-danger" role="alert" style={{display: sent ? 'none' : 'block'}} >
                Invalid data.
          </div>
         
        }
        </div>
    )
}

export default Alert;