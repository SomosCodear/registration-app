import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../assets/images/logo-main.svg';
import { Button, Screen } from '../styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  padding-bottom: 0.625rem;
`;

const ItemLabel = styled.strong`
  font-size: 1rem;
  padding-bottom: 0.3125rem;
  color: ${({ theme }) => theme.palette.generics.balck};
`;

const ItemValue = styled.p`
  margin: 0;
  font-size: 1.625rem;
  color: ${({ theme }) => theme.palette.primary};
`;

const Logo = styled.img`
  height: 12.5rem;
  margin-bottom: 5.375rem;
`;

export const Results = ({ data, onAction, onCancel }) => (
  <Screen>
    <Container>
      <Logo src={logo} />
      <List>
        {
          Object.keys(data).map((key) => (
            <Item key={key}>
              <ItemLabel>{data[key].label}</ItemLabel>
              <ItemValue>{data[key].value}</ItemValue>
            </Item>
          ))
        }
        <Item>
          <br />
          <br />
          <Button large onClick={onAction}>Something!</Button>
        </Item>
        <Item>
          <Button color="secondary" large onClick={onCancel}>Cancel</Button>
        </Item>
      </List>
    </Container>
  </Screen>
);

Results.propTypes = {
  data: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
