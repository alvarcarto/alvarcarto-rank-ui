import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import config from '../config'

const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px 0 40px;
`

const IntroSection = styled.div`
  padding: 60px 0 50px 0;
  background: #6980F3;
  color: white;
  position: relative;

  @media (min-width: 1200px) {
    padding: 80px 0 80px 0;
  }
`
const Slogan = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  max-width: 400px;

  @media (min-width: 1200px) {
    font-size: 2rem;
    max-width: 600px;
  }
`

const WhatIsSiftySection = styled.div`
  padding: 20px 0 100px 0;

  p {
    max-width: 440px;
    font-size: 1.05rem;
    line-height: 1.6rem;
  }

  ul {
    margin-bottom: 40px;

    li {
      height: 1.6rem;
    }
  }
`

const BlueTriangle = styled.img`
  height: 50px;
  width: 100%;

  @media (min-width: 600px) {
    height: 80px;
  }

  @media (min-width: 1200px) {
    height: 100px;
  }
`

const BenefitsSection = styled.div`
  padding: 20px 0 100px 0;
`

const BenefitsList = styled.ol`
  counter-reset: item;
  list-style: none;
  padding-left: 0;
`

const BenefitsListItem = styled.li`
  counter-increment: item;
  margin-bottom: 45px;
  position: relative;
  color: #333;

  h3 {
    padding-left: 35px;
  }

  :before {
    position: absolute;
    left: 0;
    content: counter(item);
    background: #6980F3;
    border-radius: 100%;
    color: white;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const BenefitImg = styled.img`
  width: 200px;
`

const LetsGetStartedSection = styled.div`
  padding-bottom: 120px;
`

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <NavBar />
        <IntroSection>
          <TextContainer>
            <Slogan>Easy and intuitive way to rank set of images as a group.</Slogan>
            <Link to="/new-poll"><Button onClick={console.log}>Start</Button></Link>
          </TextContainer>
        </IntroSection>
        <BlueTriangle src={`${config.PUBLIC_URL}/assets/blue-triangle.svg`} alt="" />
        <WhatIsSiftySection>
          <TextContainer>
            <h2>What is Sifty?</h2>
            <p>
              Sifty is an easy and intuitive way to rank
              set of images as a group of people. You could for example find the best:
            </p>
            <ul>
              <li>Logo for your company.</li>
              <li>Cover image for your company's Facebook profile.</li>
              <li>Wedding photos.</li>
            </ul>
            <p>
              Images are sorted based on the <i>lower bound of Wilson score confidence interval for a Bernoulli parameter</i>.
              <span><b> This means you have to do less work sorting and the end result is backed by sophisticated mathematics.</b></span>
            </p>
          </TextContainer>
        </WhatIsSiftySection>
        <BenefitsSection>
          <TextContainer>
            <BenefitsList>
              <BenefitsListItem>
                <h3>Create a poll</h3>
                <BenefitImg alt="" src={`${config.PUBLIC_URL}/assets/create-a-poll.svg`} />
              </BenefitsListItem>
              <BenefitsListItem>
                <h3>Everyone votes</h3>
                <BenefitImg alt="" src={`${config.PUBLIC_URL}/assets/everyone-votes.svg`} />
              </BenefitsListItem>
              <BenefitsListItem>
                <h3>See the results</h3>
                <BenefitImg alt="" src={`${config.PUBLIC_URL}/assets/see-results.svg`} />
              </BenefitsListItem>
            </BenefitsList>
          </TextContainer>
        </BenefitsSection>
        <LetsGetStartedSection>
          <TextContainer>
            <h2>Let's get started</h2>
            <Link to="/new-poll">
              <Button invert onClick={console.log}>Create a poll</Button>
            </Link>
          </TextContainer>
        </LetsGetStartedSection>

        <Footer />
      </div>
    );
  }
}

export default LandingPage;
