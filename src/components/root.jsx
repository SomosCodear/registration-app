import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../styles';

export const Root = ({ children }) => (
  <>
    <GlobalStyles />
    {children}
  </>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
