import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../Routes/routes';


const Navigation = () => (
  <div className='header'>

        <nav className="navbar navbar-expand navbar-dark bg-dark">
           <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={ROUTES.HOTELS} className="nav-link">
                Hotel
              </Link>
            </li>

            <li className="nav-item">
              <Link to={ROUTES.RESTAURANT} className="nav-link">
                Restaurant
              </Link>
            </li>

            <li className="nav-item">
              <Link to={ROUTES.AGENCY} className="nav-link">
                Agency
              </Link>
            </li>

            <li className="nav-item">
              <Link to={ROUTES.TRANSPORT} className="nav-link">
                Transport
              </Link>
            </li>

            <li className="nav-item">
              <Link to={ROUTES.ADD} className="nav-link">
                Add
              </Link>
            </li>

          </div>
        </nav>
  </div>
);

export default Navigation;
