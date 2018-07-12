import React, { Component } from 'react';
import _ from 'lodash'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import RateScale from '../components/RateScale'
import { getPoll } from '../util/api'

const PageContent = styled.div`
  padding-top: 30px;
`

const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px 0 40px;
`

const HeaderSection = styled.div`
  margin: 20px 0 80px 0
`
const ResultsSection = styled.div`
  h2 {
    margin-top: 140px;
  }
`

const ImagesSection = styled.div`
  p {
    margin-bottom: 40px;
  }
`
const Images = styled.ol`
  list-style: none;
  margin: 10px 0 50px 0;
  padding: 0;

  img {
    max-width: 230px;
    margin: 5px;
    border: 2px solid #6880f3;
    border-radius: 5px;
  }

  li {
    counter-increment: item;
    position: relative;
    display: flex;
  }

  li img {
    align-self: center
  }

  li:before {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #6980F3;
    content: counter(item);
    background: white;
    border-radius: 100%;
    font-weight: bold;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${props => props.voteSessionsCount < 1 && `
    opacity: 0.5;

    li:before {
      content: "?";
    }
  `}
`

const ImageStats = styled.div`
  padding: 4px 0 0 10px;

  p {
    margin: 0;
  }
`

class PollResultsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poll: null,
    }
  }

  componentDidMount() {
    const slug = this.props.match.params.slug
    getPoll(slug)
      .then((res) => {
        this.setState({
          poll: res.data,
        })
      })
      .catch((err) => {
        alert(err)
      })
  }

  render() {
    const { poll } = this.state
    if (!poll) {
      return null
    }

    const sortedTargets = _.orderBy(poll.targets, ['score'], ['desc'])

    return (
      <div className="PollResultsPage">
        <NavBar />
        <PageContent>
          <TextContainer>
            <HeaderSection>
              <h2>Results</h2>
              <p>{this.getText(poll.voteSessionsCount)}</p>
            </HeaderSection>

            <ResultsSection>
              <RateScale poll={poll} />

              <ImagesSection>
                <h2>Ranking list</h2>
                <p>Based on everyone's votes</p>
                <Images voteSessionsCount={poll.voteSessionsCount}>
                  {
                    _.map(sortedTargets, (target) => {
                      return <li key={target.id}>
                        <img src={target.imageUrl} alt="" />
                        <ImageStats>
                          <p>Score: {target.score}</p>
                          <p>Wins: {target.wins}</p>
                          <p>Losses: {target.losses}</p>
                        </ImageStats>
                      </li>
                    })
                  }
                </Images>
              </ImagesSection>
            </ResultsSection>
          </TextContainer>
        </PageContent>
      </div>
    )
  }

  getText(count) {
    if (!count || count < 1) {
      return 'No votes yet. Results will appear after first vote.'
    } else if (count === 1) {
      return `Images are in order below, first one is the winner. ${count} person has voted.`
    }


    return `Images are in order below, first one is the winner. ${count} people have voted.`
  }
}

export default PollResultsPage;
