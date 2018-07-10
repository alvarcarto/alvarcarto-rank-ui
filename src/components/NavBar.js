import React from 'react';
import styled from 'styled-components';
import Link from './Link'
import config from '../config';

const NavBarContainer = styled.div`
  width: 100%;
  height: 70px;
  background: #F5F5F5;
  border-top: 3px solid #84DAB3;
  display: flex;
  justify-content: center;
  z-index: 100;
  position: relative;
`

const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
`

const LogoImg = styled.img`
  padding-top: 5px;
  height: 30px;
`

const NavBar = (props) => <NavBarContainer>
  <Content>
    <Link to="/">
      <LogoImg src={`${config.PUBLIC_URL}/assets/sifty-logo.svg`} alt="Sifty" />
    </Link>
    <Link to="/new-poll">Create a poll</Link>
  </Content>
</NavBarContainer>

export default NavBar;
