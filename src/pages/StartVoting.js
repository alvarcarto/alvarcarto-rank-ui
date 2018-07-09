import React, { Component } from 'react';
import _ from 'lodash'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { getPoll, postVoteSession } from '../util/api'

const TextContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px 0 40px;
`

const PollInfo = styled.div`
  background: #f4f4f4;
  padding: 20px 20px;
  border-radius: 5px;
  margin-bottom: 40px;

  p, h4 {
    margin: 0;
    padding: 0;
  }

  h4 {
    width: 120px;
  }
  p {
    max-width: 400px;
  }

  div {
    display: flex;
  }
  div:not(:last-child) {
    margin-bottom: 20px;
  }
`

const TextInput = styled.input`
  padding: 10px 10px;
  display: block;
  margin-bottom: 12px;
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

        <TextContainer>
          <div>
            <h2>{_.get(poll, 'authorName')} invited you to vote</h2>
          </div>

          <PollInfo>
            <div>
              <h4>Poll</h4>
              <p>{_.get(poll, 'title')}</p>
            </div>

            <div>
              <h4>Description</h4>
              <p>{_.get(poll, 'description')}</p>
            </div>
          </PollInfo>

          <div>
            <h3>What's your name?</h3>
            <TextInput type="text" name="name" placeholder="Your name" value={this.state.form.name} onChange={this.onInputChange} />

            <Button onClick={this.onStartClick}>Start</Button>
          </div>
        </TextContainer>
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
