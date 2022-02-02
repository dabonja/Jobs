import React from 'react';
import JobDescription from './JobDescription';
import { useEffect, useState, useReducer } from 'react';
import Title from './Title'
import NoJobsInCategory from './NoJobsInCategory';
import Selection from './Selection';
import CompaniesList from './CompaniesList'
import Pagination from './Pagination'
import Footer from './Footer'

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };

        case 'decrement':
            return { ...state, count: state.count - 1 };

        case 'incId':
            return { ...state, id: state.id + 1 };

        default:
            throw new Error();
    }

}

var initialState = {
    count: 0,
    id: 5
}

const Home = ({ categoriesList ,handleChange, optState}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedJobs, setSelectedJobs] = useState([]);
  
    const [found, setFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(4);

/*
  const [optionState, setOptionState] = useState('');
  const handleChange = (e) => {
        setOptionState(prevState => prevState = e.target.value)

    }
*/
   

    useEffect(() => {
        setFound(false)
        let filteredJobs = categoriesList && categoriesList.filter(job => job.category_name === optState)
        setSelectedJobs([...filteredJobs])
        if (filteredJobs.length === 0 && optState !== '') {
            setFound(true)
        }
        if (optState === 'Choose the right work for you...') {
            setFound('none')
        }

    }, [optState])

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = selectedJobs.slice(indexOfFirstJob, indexOfLastJob);

    //Pagination change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    let jobTypes = categoriesList && categoriesList.map(job => job.category_name)
    let categories = [...new Set(jobTypes)];

    return (
        <>
            <div className="container" align="center" >
                <Title title="Hire a professional company!" title2="Find a company suitable for you, here are available categories." />
                <Selection categories={categories} handleChange={handleChange} optState={optState} />
            </div>
            <div className="container-fluid" style={{ backgroundColor: '#f6f6f8', position: 'relative', height: '35rem', display: true ? 'block' : 'none' }}>
                <div className="row">
                    <div className="col-lg-10 ">
                        <ul className="row mt-3 justify-content-center">
                            {
                                currentJobs && currentJobs.map((job, idx) => (
                                    <JobDescription key={idx} category={job.category_name} description={job.description} name={job.company_name} contact={job.contact} location={job.location} />
                                ))
                            }
                            <NoJobsInCategory disp={found} style={{ backgroundColor: 'e6fff9' }} />
                        </ul>
                    </div>
                    <CompaniesList jobs={selectedJobs} show={found} />
                </div>
            </div>
            <Pagination jobsPerPage={jobsPerPage} totalJobs={selectedJobs.length} paginate={paginate} />
            <Footer />
        </>
    )
}

export default Home
{
    /*
         <button onClick={()=>{ 
                    dispatch({type:'increment'})
                }}>increment</button>
                <button onClick={()=>{
                 
                    dispatch({type:'decrement'})
                }}>decrement</button>

                <button onClick={()=>{
                 
                 dispatch({type:'incId'})
             }}>Increment id</button>
                <h3>Ovde: {state.count}</h3>
                <h3>Ovde: {state.id}</h3>
    */
}