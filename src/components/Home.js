import React from 'react';
import JobDescription from './JobDescription';
import Selection from './Selection';
import { useEffect, useState } from 'react';
import Title from './Title'

const Home = ({ categoriesList }) => {

    let catList = [...categoriesList];
 
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [optionState, setOptionState] = useState('');
    const handleChange = (e) => {
        setOptionState(prevState => prevState = e.target.value)
    }

    useEffect(() => {
        let filteredJobs = catList.filter(job => job.category_name === optionState)
        console.log(optionState);
        setSelectedJobs([...filteredJobs])
        console.log(selectedJobs);
    }, [optionState])

    let jobTypes = catList.map(job => job.category_name)
    let categories = [...new Set(jobTypes)];

    return (
        <div className="align-items-center justify-content-center d-flex" style={{ position:'relative', top: '10rem' }}>
            <div className="container">
                <Title title="Unajmite firmu za odredjeni posao!" />
                <select className="form-select" aria-label="Default select example" onChange={handleChange} >

                    <option defaultValue="selected" >Izaberite trazeni posao...</option>
                    {
                        categories.map(jobType => (
                            <option key={jobType.id} value={jobType.category_name}>{jobType}</option>
                        ))
                    }

                </select>

                <div className="col"  align="center">
                   
                        {
                            selectedJobs && selectedJobs.map(job => (
                                <JobDescription key={job.id} category={job.category_name} description={job.description} name={job.companyName} contact={job.contact} location={job.location} />
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