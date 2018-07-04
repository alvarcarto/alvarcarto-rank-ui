import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 10px 25px;
  color: #6980F3;
  background: white;
  border: none;
  border-radius: 15px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.1);
    transform: translate(0, -2px);
  }

  ${props => props.invert && styled.css`
    background: #6980F3;
    color: white;
  `}
`

const Button = (props) => <StyledButton onClick={props.onClick}>
  {props.children}
</StyledButton>

export default Button;
