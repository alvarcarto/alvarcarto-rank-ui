import React from 'react';
import styled from 'styled-components';
import config from '../config'

const FooterContainer = styled.div`
  width: 100%;
  height: 100px;
  background: #F5F5F5;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`

const LogoImg = styled.img`
  height: 11px;
  margin-left: 5px;
`

const Footer = (props) => <FooterContainer>
  Hosting sposored by
  <a href="https://alvarcarto.com">
    <LogoImg src={`${config.PUBLIC_URL}/assets/alvar-carto-logo-dark.svg`} alt="Alvar Carto" />
  </a>
</FooterContainer>

export default Footer;
