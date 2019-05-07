import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  width: ${({ large }) => (large ? '100%' : 'auto')};
  height: ${({ large }) => (large ? '4.375rem' : '1.875rem')};
  color: ${({ theme }) => theme.palette.text};
  font-family: inherit;
  font-size: ${({ large }) => (large ? '1.25rem' : '0.75rem')};
  font-weight: ${({ large }) => (large ? 'bold' : 'normal')};
  text-transform: uppercase;
  border-radius: 0.625rem;
  border: 0.0625rem solid ${({ color, theme }) => (
    color === 'secondary' ?
      theme.palette.secondary :
      theme.palette.primary
  )};
  background-color: ${({ color, theme }) => (
    color === 'secondary' ? theme.palette.secondary : theme.palette.primary
  )};
  text-align: center;
  transition: ease-out 300ms;
  &:disabled,
  &:disabled:hover {
    cursor: default;
    color: ${({ theme }) => theme.palette.text};
    background-color: ${({ theme }) => theme.palette.secondaryDisabled};
    border-color: ${({ theme }) => theme.palette.secondaryDisabled};
  }
  -webkit-appearance: none;
`;
