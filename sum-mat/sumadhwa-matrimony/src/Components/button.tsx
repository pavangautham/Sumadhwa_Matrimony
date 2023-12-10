// ReusableButton.tsx
import styled from 'styled-components';

interface ButtonProps {
  backgroundColor?: string;
  textColor?: string;
}

export const Button = styled.button.attrs<ButtonProps>(() => ({
    type: 'submit',
  }))<ButtonProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;
