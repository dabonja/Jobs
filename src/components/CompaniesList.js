import React from 'react';
import { useEffect } from 'react';
import Title from './Title';

const CompaniesList = (props) => {
    const { jobs, show } = props;

    return (
        <div className="col mt-3" style={{ display: !show, overflow: 'scroll',maxHeight: '33rem',overflowX:'hidden',position:'relative' }}>
            <ul className="list-group list-group-flush" style={{width: '100%'}}>
                {
                    jobs && jobs.map((job, idx) => (
                        <li key={idx} className="list-group-item" >{job.company_name}</li>
                    ))
                }
            
            </ul>
        </div>
    )
}

export default CompaniesList;