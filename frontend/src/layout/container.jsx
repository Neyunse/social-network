import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import moment from "moment";
import { common, navv, timeline } from 'assets/css'

import Search from 'components/search';
import Users from 'components/search/users';
import UserCard from 'components/userCard';
function Container(props) {
  const { children } = props;

  moment.locale(localStorage.getItem('i18nextLng')); // localStorage.getItem('i18nextLng')
  return (
    <>
    <div className={common.row + " " + common.layout}>
        <div className={common.column + " " + common.header}>
          <div className="nav">
            <div className={navv.card}>
              <UserCard userID="7" />
              <div className={navv.card_nav}>
                <nav>
                  <ul>
                    <li>
                      <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to={`/profile/${sessionStorage.getItem('username')}`}>Profile</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </div>
        <main className={common.column + " " + common.main_col}>
          <div className={common.row}>
            <div className={common.column + " " + timeline.timeline}>
              {children}
            </div>
            <aside className={common.column}>
              <Search users={Users} />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}

export default Container;

const propTypes = {
  children: PropTypes.element.isRequired
};

Container.propTypes = propTypes;