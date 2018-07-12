import React, { Component } from 'react';
import _ from 'lodash'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import PollInfo from '../components/PollInfo'
import { getPoll, postVoteSession } from '../util/api'

const PageContent = styled.div`
  padding-top: 30px;
`

const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px 0 40px;
`

const Text = styled.p`
  margin-top: 0;
  margin-bottom: 50px;
  max-width: 500px;
`

const FormSection = styled.div`
  h3 {
    margin-bottom: 10px;
  }
`

const TextInput = styled.input`
  padding: 10px 10px;
  display: block;
  margin-bottom: 32px;
  border-radius: 5px;
  min-width: 300px;
  border: 1px solid #ddd;

  &[name="name"] {
    min-width: 180px;
  }
`

class StartVotingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poll: null,
      form: {
        name: '',
      },
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

    return (
      <div className="StartVotingPage">
        <NavBar />
        <PageContent>
          <TextContainer>
            <div>
              <h2>{_.get(poll, 'authorName')} invited you to vote</h2>
              <Text>You will be asked to choose the best image out of two or more options. Please
              keep answering until you are redirected to the poll results. It will take a minute.
              </Text>
            </div>

            <PollInfo poll={poll} />

            <FormSection>
              <h3>What's your name?</h3>
              <TextInput type="text" name="name" placeholder="Your name" value={this.state.form.name} onChange={this.onInputChange} />
              <Button invert onClick={this.onStartClick}>Start</Button>
            </FormSection>
          </TextContainer>
        </PageContent>
      </div>
    )
  }

  onInputChange = (e) => {
    this.setState({
      form: _.merge(this.state.form, {
        [e.target.name]: e.target.value,
      }),
    });
  }

  onStartClick = () => {
    const { poll } = this.state
    console.log('Start')
    const voteSession = {
      authorName: this.state.form.name,
    }

    postVoteSession(poll.slug, voteSession)
      .then((res) => {
        const { id } = res.data

        console.log('this.state.poll', this.state.poll)
        window.location = `/polls/${poll.slug}/vote-sessions/${id}`
      })
      .catch(err => {
        alert(err)
      })
  }
}

export default StartVotingPage;
