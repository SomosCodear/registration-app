import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  text-transform: capitalize;
`;

const Loading = styled.div`
  font-size: 1.8rem;
  padding: 1.8rem 0;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary};
`;

const ErrorMessage = styled.div`
  padding-bottom: 1.8rem;
  color: ${({ theme }) => theme.palette.error};
  font-size: 1.3rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  padding-bottom: 1.8rem;
  color: ${({ theme }) => theme.palette.primary};
  font-size: 1.3rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
`;

export const Results = ({
  doingCheckIn,
  error,
  success,
  data,
  onAction,
  onCancel,
}) => (
  <Screen>
    <Container>
      <List>
        {
          Object.keys(data)
          .filter((key) => !!data[key].label)
          .map((key) => (
            <Item key={key}>
              <ItemLabel>{data[key].label}</ItemLabel>
              <ItemValue>{data[key].value}</ItemValue>
            </Item>
          ))
        }
        {
          doingCheckIn ?
            (
              <Loading>Loading</Loading>
            ) :
            (
              <>
                <Item>
                  {
                    error ?
                      (
                        <ErrorMessage>{error}</ErrorMessage>
                      ) :
                      (
                        <>
                          <br />
                          <br />
                        </>
                      )
                  }
                  {
                    success ?
                      (
                        <SuccessMessage>Success!</SuccessMessage>
                      ) :
                      (
                        <Button large onClick={onAction}>Check in!</Button>
                      )
                  }

                </Item>
                <Item>
                  <Button color="secondary" large onClick={onCancel}>
                    {
                      success ?
                        'Go Back' :
                        'Cancel'
                    }
                  </Button>
                </Item>
              </>
            )
        }
      </List>
    </Container>
  </Screen>
);

Results.propTypes = {
  doingCheckIn: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
