import styled from 'styled-components';
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  color: #6980F3;
  text-decoration: none;

  &:hover, &:visited, &:active {
    color: #6980F3;
  }

  &:hover {
    text-decoration: underline;
  }
`

export default StyledLink
