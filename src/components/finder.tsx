import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input, Screen } from '../styles';

export type FinderProps = {
  searching: boolean;
  error: string;
  onSearch: (dni: string) => void;
  onCancel: () => void;
};

export const Finder: React.FC<FinderProps> = ({
  searching = false,
  error = true,
  onSearch,
  onCancel,
}) => {
  const [dni, setDNI] = useState('');
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setDNI(target.value);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSearch(dni);
  };
  return (
    <Screen>
      <Container>
        {searching ? (
          <Loading>Loading</Loading>
        ) : (
          <form action="index" onSubmit={submitHandler}>
            <InputLabel>Enter the DNI</InputLabel>
            <InputContainer>
              <Input
                type="number"
                value={dni}
                name="name"
                onChange={changeHandler}
                color="secondary"
                pattern="\d*"
                bold
                large
              />
            </InputContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ActionContainer>
              <Button type="submit" large>
                Search
              </Button>
            </ActionContainer>
          </form>
        )}
        <ActionContainer>
          <Button color="secondary" large onClick={onCancel}>
            Cancel
          </Button>
        </ActionContainer>
      </Container>
    </Screen>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const InputContainer = styled.div`
  padding: 0.5rem 0 1.8rem 0;
`;

const InputLabel = styled.label`
  font-size: 1.5rem;
  padding-bottom: 0.3125rem;
  color: ${({ theme }) => theme.palette.generics.black};
`;

const ActionContainer = styled.div`
  padding-bottom: 1.1rem;
`;

const Loading = styled.div`
  font-size: 1.8rem;
  padding-bottom: 1.8rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary};
`;

const ErrorMessage = styled.div`
  padding-bottom: 1.8rem;
  color: ${({ theme }) => theme.palette.error};
  font-size: 1.3rem;
  text-align: center;
`;

Finder.propTypes = {
  searching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
