import React from 'react';
import JobDescription from './JobDescription';
import Selection from './Selection';
import { useEffect, useState } from 'react';
import Title from './Title'

const Home2 = ({ jobs }) => {

    let jbs = [...jobs];

    const [selectedJobs, setSelectedJobs] = useState([]);
    const [optionState, setOptionState] = useState('');
    const handleChange = (e) => {
        setOptionState(prevState => prevState = e.target.value)
    }

    useEffect(() => {
        let filteredJobs = jbs.filter(job => job.category === optionState)
        setSelectedJobs([...filteredJobs])
    }, [optionState])

    let jobTypes = jobs.map(job => job.category)
    let categories = [...new Set(jobTypes)];

    return (
        <div className="row" style={{ height: '30rem',position:'relative' }}>
            <Title title="Unajmite firmu za odredjeni posao!" />
            <select className="form-select" aria-label="Default select example" onChange={handleChange} style={{position:'absolute'}}>

                <option defaultValue="selected" >Izaberite trazeni posao...</option>
                {
                    categories.map((jobType, idx) => (
                        <option key={idx} value={jobType}>{jobType}</option>
                    ))
                }

            </select>
            <div className="row">
                <div className="col-3">

                    {
                        selectedJobs && selectedJobs.map(job => (
                            <JobDescription key={job.id} category={job.category} description={job.description} name={job.firm} contact={job.contact} location={job.location} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home2

/*
  <div className="list-inline">

            {
                    jobs && jobs.map( job =>(
                        <JobDescription key= {job.id} category = {job.category} description={job.description} name={job.firm} contact={job.contact} location={job.location} />
                    ))
                }

            </div>
*/