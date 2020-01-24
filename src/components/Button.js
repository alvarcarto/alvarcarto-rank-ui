import React from 'react'
import _ from 'lodash'
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

  ${props => props.invert && `
    background: #6980F3;
    color: white;
  `}

  ${props => props.outline && `
    padding: 8px 25px;
    background: #6980F3;
    color: white;
    border: 2px solid white;
  `}

  ${props => props.disabled && `
    background: #aaa;
    color: white;

    &:hover {
      cursor: not-allowed;
      box-shadow: none;
      transform: translate(0, 0);
    }
  `}


`

const Button = (props) => <StyledButton {...props} onClick={(e) => props.disabled ? null : props.onClick(e)}>
  {props.children}
</StyledButton>

export default Button;
