import React, { Component } from 'react';
import _ from 'lodash'
import { Navigation } from 'junctions'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { getPoll, postVoteSession } from '../util/api'

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
    const slug = this.props.page.params.slug
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

        <div>
          <h2>{_.get(poll, 'authorName')} invited you to vote</h2>
        </div>

        <div>
          <div>
            <h4>Poll</h4>
            <p>{_.get(poll, 'title')}</p>
          </div>

          <div>
            <h4>Description</h4>
            <p>{_.get(poll, 'description')}</p>
          </div>
        </div>

        <div>
          <h3>What's your name?</h3>
          <input type="text" name="name" placeholder="Your name" value={this.state.form.name} onChange={this.onInputChange} />

          <Button onClick={this.onStartClick}>Start</Button>
        </div>

        <Footer />
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

    postVoteSession(poll.slug)
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
