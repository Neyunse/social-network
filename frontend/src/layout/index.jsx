import React from 'react';
import PropTypes from 'prop-types';
import Container from './container';


function Main(props) {
  const { children } = props;
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