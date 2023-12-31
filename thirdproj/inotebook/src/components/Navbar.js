import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  let location = useLocation();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand mb-0 h1" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/'? "active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about'? "active":""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token')? <form className="d-flex me-auto">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
          </form> : <form className='d-flex me-auto'> <button onClick={handleLogout} className='btn btn-primary'>Logout</button></form>}
        </div>
      </div>
    </nav>
  );
}


export default Navbar
