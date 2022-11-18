import React from 'react';
import styled from 'styled-components';
import { Button, Screen } from '../styles';

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  height: 12.5rem;
  max-width: 100%;
`;

const LogoWrapper = styled.div`
  background-color: #1f1f1f;
  padding: 0 1.5rem;
  margin-bottom: 5.375rem;
`;

const ActionContainer = styled.div`
  padding-bottom: 1.1rem;
`;

export type StartProps = {
  onScanClick: () => void;
  onSearchClick: () => void;
};

export const Start: React.FC<StartProps> = ({ onScanClick, onSearchClick }) => (
  <Screen>
    <Container>
      <LogoWrapper>
        <Logo src="/assets/images/logo-main.svg" />
      </LogoWrapper>
      <ActionContainer>
        <Button large onClick={onScanClick}>
          Scan ticket
        </Button>
      </ActionContainer>
      <ActionContainer>
        <Button large onClick={onSearchClick}>
          Search DNI
        </Button>
      </ActionContainer>
    </Container>
  </Screen>
);
