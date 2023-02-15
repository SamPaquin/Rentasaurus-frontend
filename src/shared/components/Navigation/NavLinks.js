import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import EggWhite from "../../../images/Egg-White.svg";
import Button from '../FormElements/Button';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <img src={EggWhite} alt="Rentasaurus" />
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/reports`}>MY REPORTS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/reports/new">ADD REPORT</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/auth"><Button inverse onClick={auth.logout}>LOGOUT</Button></NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
