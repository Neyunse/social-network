import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import UserNav from "Components/usernav";
import TopNav from './TopNav';
function Container(props) {
  const { children } = props;
  return (
    <>
      <TopNav />
      <div className="navegation main">
        <div className="nav">
          <UserNav />
          <nav>
            <ul>
              <li>
                <NavLink to="/home" exact>Home</NavLink>
              </li>

              <li>
                <NavLink to={`/u/${localStorage.getItem("username")}`} exact>Profile</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="page_container main">
        <div className="content">{children}</div>
      </div>
      <div className="aside_side main">
        <div className="side">
          <h3>Official News</h3>
        </div>
      </div>
    </>
  );
}

export default Container;

const propTypes = {
  children: PropTypes.element.isRequired
};

Container.propTypes = propTypes;