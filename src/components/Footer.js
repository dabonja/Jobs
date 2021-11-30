import React from 'react';

const Footer = ({ allJobs }) => {
    let keys = Object.keys(allJobs)

    return (
        <div className="container-fluid" style={{ position: 'relative' }}>
            <footer>
                <div className="row">
                    <h3>Pretraga poslova prema gradovima, poslovi u Srbiji</h3>
                </div>
                <div className="row">
                    <div className="col-4">
                        <ol className="list-group list-group-numbered">
                            {
                                keys.map((item, idx) => (
                                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item}</div>
                                            Broj poslova:
                                        </div>
                                        <span className="badge bg-primary rounded-pill">{allJobs[item]}</span>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                    <div className="col-4 border">

                    </div>
                    <div className="col-4 border">c</div>
                </div>
            </footer>
        </div>
    )
}
export default Footer