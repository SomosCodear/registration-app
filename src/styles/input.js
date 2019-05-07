import styled, { css } from 'styled-components';

export const Input = styled.input`
  margin: 0rem;
  padding: 0.125rem 0.75rem;
  width: auto;
  color: ${({ color, theme }) => (
    color === 'secondary' ? theme.palette.secondary : theme.palette.primary
  )};
  border-radius: 0.625rem;
  border: 0.0625rem solid ${({ color, theme }) => (
    color === 'secondary' ? theme.palette.secondary : theme.palette.primary
  )};
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5rem;
  ${({ bold }) => bold && css`
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.25rem 0.75rem;
  `}
  ${({ large }) => large && css`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.35rem 0.85rem;
    width: 100%;
    box-sizing: border-box;
  `}
  ${({ borderless }) => borderless && css`
    border-width: 0;
  `}
  ${({ uppercase }) => uppercase && css`
    text-transform: uppercase;
  `}
  ${({ transparent }) => transparent && css`
    background-color: rgba(255, 255, 255, 0.9);
  `}
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
      -webkit-transition-delay: 99999s;
  }
`;
