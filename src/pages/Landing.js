import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import config from '../config'

const IntroSection = styled.div`
  padding: 60px 40px 8vw 40px;
  background: #6980F3;
  color: white;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 6000px;
    transform: skewY(-6deg);
    transform-origin: 100% 100%;
    background: #6980F3;
  }

  @media (min-width: 600px) {
    &:after {
      transform: skewY(-4deg);
    }
  }
`
const Slogan = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  max-width: 400px;
`
const BenefitsSection = styled.div`
  padding: 20px 40px 100px 40px;
`

const BlueTriangle = styled.img`
  height: 40px;
  width: 100%;
`

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <NavBar />
        <IntroSection>
          <Slogan>Easy and intuitive way to rank set of images as a group.</Slogan>
          <Link to="/new-poll"><Button onClick={console.log}>Start</Button></Link>
          <BlueTriangle src={`${config.PUBLIC_URL}/assets/blue-triangle.svg`} alt="" />
        </IntroSection>
        <BenefitsSection>
          <h2>What is Sifty?</h2>
          <p>
            <b>
              Sifty is an easy and intuitive way to rank
              set of images as a group.
            </b>
            For example you can easily find out what would be everyone's favorite cover image
            for your company's Facebook profile.
          </p>
        </BenefitsSection>
        <div>
          <ol>
            <li>
              <h3>Create a poll</h3>
              <img alt="" src="public/create-a-poll.svg" />
            </li>
            <li>
              <h3>Everyone votes</h3>
              <img alt="" src="public/everyone-votes.svg" />
            </li>
            <li>
              <h3>See the results</h3>
              <img alt="" src="public/see-the-results.svg" />
            </li>
          </ol>
        </div>
        <div>
          <h2>Let's get started</h2>
          <Link to="/new-poll"><Button onClick={console.log}>Create a poll</Button></Link>
        </div>

        <Footer />
      </div>
    );
  }
}

export default LandingPage;
