import React from 'react';
import JobDescription from './JobDescription';
import Selection from './Selection';
import { useEffect, useState } from 'react';
import Title from './Title'

const Home = ({ categoriesList }) => {

    let catList = [...categoriesList];
 
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [optionState, setOptionState] = useState('');
    const [found,setFound] = useState('none');

    const handleChange = (e) => {
        setOptionState(prevState => prevState = e.target.value)
        
    }

    useEffect(() => {
        setFound('none')
        let filteredJobs = catList.filter(job => job.category_name === optionState)
        setSelectedJobs([...filteredJobs])
        if(filteredJobs.length === 0 && optionState !== ''  ){
            setFound('block')
        }
        if(optionState === 'Izaberite trazeni posao...'){
            setFound('none')
        }
        
    }, [optionState])

    let jobTypes = catList.map(job => job.category_name)
    let categories = [...new Set(jobTypes)];

    return (
        <div className="align-items-center justify-content-center d-flex" style={{ position:'relative', top: '10rem' }}>
            <div className="container">
                <Title title="Hire a professional company!" />
                <select className="form-select" aria-label="Default select example" onChange={handleChange} >

                    <option defaultValue="selected" >Choose the right work for you...</option>
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
                        <h1 style={{display:found}}>Trenutno nema registrovanih firmi za izabranu vrstu posla.</h1>
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