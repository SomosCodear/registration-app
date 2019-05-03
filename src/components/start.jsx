import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../assets/images/logo-main.svg';
import { Button, Screen } from '../styles';

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  height: 12.5rem;
  margin-bottom: 5.375rem;
`;

export const Start = ({ onClick }) => (
  <Screen>
    <Container>
      <Logo src={logo} />
      <Button large onClick={onClick}>Scan!</Button>
    </Container>
  </Screen>
);

Start.propTypes = {
  onClick: PropTypes.func.isRequired,
};
