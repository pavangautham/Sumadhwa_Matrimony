// ReusableButton.tsx
import styled, { css } from 'styled-components';

interface ButtonProps {
  backgroundColor?: string;
  textColor?: string;
  loading?: boolean;
}

export const Button = styled.button.attrs<ButtonProps>(() => ({
  type: 'submit',
}))<ButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')}; // Disable cursor when loading

  ${(props) =>
    props.loading &&
    css`
      opacity: 0.7; // Reduce opacity when loading
    `}
`;
