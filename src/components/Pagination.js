import React from 'react';

const Pagination = ({ jobsPerPage, totalJobs, paginate}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example ">
                <ul className="pagination mt-2">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={()=> paginate(number)} href="#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    )
}

export default Pagination;