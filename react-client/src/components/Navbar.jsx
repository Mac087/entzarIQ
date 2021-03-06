import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          EntzarIQ
          </Link>
      </div>
    </nav>
  );
}

export default Navbar;