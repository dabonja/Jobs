import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Poslovi</a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Pocetna</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Svi poslovi</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Prijavite se na oglas</a>
              </li>
            </ul>
            <form className="d-flex">
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Login</a>
            </form>
          </div>
        </div>
      </nav>
    )
}

export default Navbar