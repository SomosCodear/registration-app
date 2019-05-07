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

const ActionContainer = styled.div`
  padding-bottom: 1.8rem;
`;

export const Start = ({ onScanClick, onSearchClick }) => (
  <Screen>
    <Container>
      <Logo src={logo} />
      <ActionContainer>
        <Button large onClick={onScanClick}>Scan ticket</Button>
      </ActionContainer>
      <ActionContainer>
        <Button large onClick={onSearchClick}>Search DNI</Button>
      </ActionContainer>
    </Container>
  </Screen>
);

Start.propTypes = {
  onScanClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
};
