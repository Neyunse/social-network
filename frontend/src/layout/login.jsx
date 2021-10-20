import React from 'react';
import PropTypes from 'prop-types';

function LogIn(props) {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
}

const propTypes = {
  children: PropTypes.element.isRequired
};

LogIn.propTypes = propTypes;

export default LogIn;