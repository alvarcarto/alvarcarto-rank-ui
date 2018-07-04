import React from 'react';
import styled from 'styled-components';
import Link from './Link'
import config from '../config';

const NavBarContainer = styled.div`
  width: 100%;
  height: 70px;
  background: #F5F5F5;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  border-top: 3px solid #84DAB3;
`

const LogoImg = styled.img`
  padding-top: 5px;
  height: 30px;
`

const NavBar = (props) => <NavBarContainer>
  <Link to="/">
    <LogoImg src={`${config.PUBLIC_URL}/assets/sifty-logo.svg`} alt="Sifty" />
  </Link>
  <Link to="/new-poll">Create a poll</Link>
</NavBarContainer>

export default NavBar;
