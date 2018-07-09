import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'


const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px 0 40px;
`

const HeaderSection = styled.div`
  margin: 50px 0 80px 0;
`

const SubHeader = styled.h3`
  margin: 35px 0 5px;
`

const SmallDescription = styled.p`
  font-size: 0.9rem;
  color: #444;
  font-style: italic;
  margin: 0 0 13px 0;
`

const Link = styled(RouterLink)`
  font-size: 1.05rem;
`


class SharePollPage extends Component {
  render() {
    const pollSlug = this.props.match.params.slug

    return (
      <div className="SharePollPage">
        <NavBar />

        <TextContainer>
          <HeaderSection>
            <h2>Share your poll</h2>
            <p>
              Please note that polls are deleted after a week of inactivity.
            </p>
          </HeaderSection>

          <div>
            <SubHeader>Link for voting</SubHeader>
            <SmallDescription>Share this to participants. Anyone can vote with this link.</SmallDescription>
            <Link to={`/polls/${pollSlug}`}>https://shifty.co/{pollSlug}</Link>

            <SubHeader>Results</SubHeader>
            <SmallDescription>See the poll results in real time.</SmallDescription>
            <Link to={`/polls/${pollSlug}/results`}>https://shifty.co/{pollSlug}/results</Link>
          </div>
        </TextContainer>
      </div>
    );
  }
}

export default SharePollPage;
