import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import config from '../config'

const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 80px 0 20px;
  position: relative;
  z-index: 20;

  @media (min-width: 700px) {
    padding: 0 40px 0 40px;
  }
`

const IntroSection = styled.div`
  padding: 60px 0 50px 0;
  background: #6980F3;
  color: white;
  position: relative;

  ${TextContainer} {
    position: relative;
    z-index: 20;
  }

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
      line-height: 1.6rem;
    }
  }
`

const BlueTriangleContainer = styled.div`
  height: 50px;
  width: 100%;
  position: relative;

  @media (min-width: 700px) {
    height: 80px;
  }

  @media (min-width: 1200px) {
    height: 100px;
  }
`
const BlueTriangle = styled.img`
  width: 100%;
  height: 100%;
`

const BenefitsSection = styled.div`
  padding: 20px 0 100px 0;
`

const BenefitsList = styled.ol`
  counter-reset: item;
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;

  @media (min-width: 700px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`

const BenefitsListItem = styled.li`
  counter-increment: item;
  margin-bottom: 45px;
  position: relative;
  color: #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 10px solid transparent;

  h3 {
    padding-left: 35px;
    margin: 0 0 25px 0;
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

  @media (min-width: 700px) {
    h3 {
      margin: 0 0 25px 0;
    }
  }
`

const BenefitImg = styled.img`
  width: 200px;
`

const LetsGetStartedSection = styled.div`
  padding-bottom: 120px;
  text-align: center;
`

const CircleContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 0 20px;

  @media (min-width: 700px) {
    padding: 0 40px 0 40px;
  }
`
const floatAnimation = keyframes`
	0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(10px, 400px);
	}
`
const floatStill = keyframes`
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0px);
  }
`
const miniFloatX = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-15px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
`
const miniFloatX2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(15px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
`

const BaseCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  position: absolute;
  background: #84DAB3;
  z-index: 10;
`
const Circle1 = BaseCircle.extend`
  width: 100px;
  height: 100px;
  background: #84DAB3;
  right: 20%;
  top: -40px;
  animation: ${floatStill} 10s ease-in-out infinite;
`
const Circle2 = BaseCircle.extend`
  width: 30px;
  height: 30px;
  background: white;
  right: 30px;
  top: -50px;
  animation: ${floatAnimation} 15s ease-in-out infinite;

  @media (min-width: 700px) {
    right: 34%;
  }
`
const Circle2B = Circle2.extend`
  right: 50px;
  animation: ${floatAnimation} 16s ease-in-out infinite;
  animation-delay: 3s;

  @media (min-width: 700px) {
    right: 35%;
  }
`
const Circle3 = BaseCircle.extend`
  width: 80px;
  height: 80px;
  right: 8%;
  top: -45px;
  animation: ${miniFloatX} 15s ease-in-out infinite;

  @media (min-width: 700px) {
    right: 22%;
  }
`
const Circle4 = BaseCircle.extend`
  width: 65px;
  height: 65px;
  right: 28%;
  top: 10px;
  background: #FFE0E0;
  animation: ${miniFloatX2} 15s ease-in-out infinite;

  @media (min-width: 700px) {
    top: 20px;
  }
`
const ItemContainer = styled.div`
  transform: translateX(370px);
  right: 30px;
  top: 50px;
  position: absolute;
  background: #F2F2F2;
  border-radius: 5px;
  width: 400px;
  height: 280px;
  z-index: 12;
  display: none;
  visibility: hidden;

  @media (min-width: 700px) {
    right: 28%;
    visibility: visible;
    display: block;
  }
`

const Item = styled.div`
  left: 30px;
  top: 40px;
  position: absolute;
  background: white;
  border-radius: 3px;
  width: 300px;
  height: 26px;
  z-index: 13;
  display: none;
  visibility: hidden;

  @media (min-width: 700px) {
    right: 28%;
    visibility: visible;
    display: block;
  }
`

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <NavBar />
        <IntroSection>
          <CircleContainer>
            <Circle1 />
            <Circle2 />
            <Circle2B />
          </CircleContainer>
          <TextContainer>
            <Slogan>Easy and intuitive way to rank set of images as a group.</Slogan>
            <Link to="/new-poll"><Button onClick={console.log}>Start</Button></Link>
          </TextContainer>
        </IntroSection>
        <BlueTriangleContainer>
          <Circle3 />
          <Circle4 />
          <ItemContainer>
            <Item />
            <Item style={{ top: '80px' }}/>
            <Item style={{ top: '120px' }}/>
            <Item style={{ top: '160px' }}/>
            <Item style={{ top: '200px' }}/>
          </ItemContainer>
          <BlueTriangle src={`${config.PUBLIC_URL}/assets/blue-triangle.svg`} alt="" />
        </BlueTriangleContainer>
        <WhatIsSiftySection>
          <TextContainer>
            <h2>What is Sifty?</h2>
            <p>
              Sifty is an easy and intuitive way to sort
              set of images as a group of people. You could for example find the best:
            </p>
            <ul>
              <li>Logo for your company</li>
              <li>Cover image for your company's Facebook profile</li>
              <li>Wedding photos</li>
            </ul>
            <p>
              Images are sorted based on the lower bound of Wilson score confidence interval for a Bernoulli parameter.
              <span><b><br />This means you have to do less work sorting and the end result is backed by sophisticated mathematics.</b></span>
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
          <h2>Let's get started</h2>
          <Link to="/new-poll">
            <Button invert onClick={console.log}>Create a poll</Button>
          </Link>
        </LetsGetStartedSection>

        <Footer />
      </div>
    );
  }
}

export default LandingPage;
