import React from 'react';
import JobDescription from './JobDescription';
import Selection from './Selection';
import { useEffect, useState } from 'react';
import Title from './Title'

const Home = ({ jobs }) => {

    let jbs = [...jobs];

    const [selectedJobs, setSelectedJobs] = useState([]);
    const [optionState, setOptionState] = useState('');
    const handleChange = (e) => {
        setOptionState(prevState => prevState = e.target.value)
    }

    useEffect(() => {
        let filteredJobs = jbs.filter( job => job.category === optionState)
        setSelectedJobs([...filteredJobs])
    }, [optionState])
{
    /*
    
    useEffect(() => {
        setSelectedJobs([...jobs])
       
    }, [jbs]) */
}
  
    let jobTypes = jobs.map(job => job.category)
    let categories = [...new Set(jobTypes)];

    return (
        <div className="container-fluid">
            <div className="container">
            <Title title="Unajmite firmu za odredjeni posao!"/>
                <select className="form-select" aria-label="Default select example" onChange={handleChange}>
                   
                    <option selected>Izaberite trazeni posao...</option>
                    {
                        categories.map((jobType, idx) => (
                            <option key={idx} value={jobType}>{jobType}</option>
                        ))
                    }

                </select>
             
                <div className="list-inline">

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

export default Home

/*
  <div className="list-inline">

            {
                    jobs && jobs.map( job =>(
                        <JobDescription key= {job.id} category = {job.category} description={job.description} name={job.firm} contact={job.contact} location={job.location} />
                    ))
                }

            </div>
*/