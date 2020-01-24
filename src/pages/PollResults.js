import React, { Component } from 'react';
import _ from 'lodash'
import Select from 'react-select';
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import RateScale from '../components/RateScale'
import RankList from '../components/RankList'
import swal from 'sweetalert2'
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
const RankingSection = styled.div`
  display: flex;
  margin-top: 140px;
`
const ResultsSection = styled.div`

`

const ImagesSection = styled.div`
  width: 50%;

  :first-child {
    padding-right: 30px;
  }
  :last-child {
    padding-left: 30px;
  }
`

const RankDescription = styled.p`
  margin-bottom: 40px;
`

const ComparisonHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 68px;

  .Select {
    margin-left: 15px;
    min-width: 140px;
  }
`

class PollResultsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poll: null,
      selectedValue: 1,
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
        swal({
          type: 'error',
          title: 'Error fetching poll',
          text: err.message,
        })
        console.error(err)
      })
  }

  render() {
    const { poll } = this.state
    if (!poll) {
      return null
    }
    console.log(poll)

    const sortedTargets = _.orderBy(poll.targets, ['score'], ['desc'])

    return (
      <div className="PollResultsPage">
        <NavBar />
        <PageContent>
          <TextContainer>
            <HeaderSection>
              <h2>Results</h2>
              <p>{this.getText(poll)}</p>
            </HeaderSection>

            <ResultsSection>
              <RateScale poll={poll} />

              <RankingSection>
                <ImagesSection>
                  <h2>Ranking list</h2>
                  <RankDescription>{this.getListText(poll)}</RankDescription>
                  <RankList disabled={poll.voteSessionsCount < 1} targets={sortedTargets} />
                </ImagesSection>
                { /*
                <ImagesSection>
                  <ComparisonHeader>
                    <h2>Compare to</h2>
                    <Select
                      name="form-field-name"
                      value={this.state.selectedValue}
                      onChange={this.onSelectChange}
                      clearable={false}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={[
                        { value: 1, label: 'Kimmo' },
                        { value: 2, label: 'Aarne' },
                      ]}
                    />
                  </ComparisonHeader>

                  <RankList disabled={poll.voteSessionsCount < 1} targets={sortedTargets} />
                </ImagesSection>
                */ }
              </RankingSection>
            </ResultsSection>
          </TextContainer>
        </PageContent>
      </div>
    )
  }

  onSelectChange = (value) => {
    this.setState({ selectedValue: value })
  }

  getText(poll) {
    const count = poll.voteSessions.length
    const names = _.map(poll.voteSessions, s => s.authorName)

    if (!count || count < 1) {
      return 'No votes yet. Results will appear after first vote.'
    } else if (count === 1) {
      return `${names[0]} has voted.`
    } else if (count === 2) {
      return `${_.first(names)} and ${_.last(names)} have voted.`
    }

    return `${_.initial(names).join(', ')}, and ${_.last(names)} have voted.`
  }

  getListText(poll) {
    const count = poll.voteSessions.length
    if (!count || count < 1 ) {
      return 'Results will appear after first vote.'
    }

    return 'Images are in order below based on everyone\'s votes. First one is the winner.'
  }
}

export default PollResultsPage;
