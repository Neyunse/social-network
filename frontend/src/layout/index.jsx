import React from 'react';
import PropTypes from 'prop-types';
import Container from './container';
import history from '../history';
import jwtdecode from "jwt-decode";
function Main(props) {
  const { children } = props;
  const token = localStorage.getItem('jwt')
  const { exp } = jwtdecode(token)
  const expirationTime = (exp * 1000) - 60000
  if (Date.now() >= expirationTime) {
    localStorage.clear();
    
    history.push('/login');
  }
  console.log(exp)

  return (
    <>
      <Container>{children}</Container>
    </>
  );
}

const propTypes = {
  children: PropTypes.element.isRequired
};

Main.propTypes = propTypes;

export default Main;