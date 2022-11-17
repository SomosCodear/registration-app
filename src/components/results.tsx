import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Screen } from '../styles';

export type ResultsProps = {
  doingCheckIn: boolean;
  error: string;
  success: boolean;
  redeemed?: boolean;
  data: Record<string, string | undefined>;
  onCancel: () => void;
  onAction: () => void;
};

const LABELS: Record<string, string> = {
  ticketId: 'Ticket ID',
  ticketStatus: 'Ticket status',
  attendeeFullName: 'Name',
  attendeeEmail: 'Email',
  attendeeID: 'DNI',
  paymentStatus: 'Payment status',
  foodPreference: 'Food preference',
  preferenceStatus: 'Preference status',
};

export const Results: React.FC<ResultsProps> = ({
  doingCheckIn,
  error,
  success,
  data,
  redeemed,
  onAction,
  onCancel,
}) => (
  <Screen>
    <Container>
      <List>
        {Object.entries(data)
          .filter(([key, value]) => value && !!LABELS[key])
          .map(([key, value]) => (
            <Item key={key}>
              <ItemLabel>{LABELS[key]}</ItemLabel>
              <ItemValue>{value}</ItemValue>
            </Item>
          ))}
        {doingCheckIn ? (
          <Loading>Loading</Loading>
        ) : (
          <>
            <Item>
              {error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : (
                <>
                  <br />
                  <br />
                </>
              )}
              {redeemed ? (
                <SuccessMessage>Check in was already done!</SuccessMessage>
              ) : success ? (
                <SuccessMessage>Success!</SuccessMessage>
              ) : (
                <Button large onClick={onAction}>
                  Check in!
                </Button>
              )}
            </Item>
            <Item>
              <Button color="secondary" large onClick={onCancel}>
                {success ? 'Go Back' : 'Cancel'}
              </Button>
            </Item>
          </>
        )}
      </List>
    </Container>
  </Screen>
);

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
  color: ${({ theme }) => theme.palette.generics.black};
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
