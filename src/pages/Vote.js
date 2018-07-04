import React, { Component } from 'react';
import _ from 'lodash'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { getPoll, getNextCombination, postVote } from '../util/api'

class VotePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poll: null,
      combination: null,
    }
  }

  async componentDidMount() {
    const { slug, sessionId } = this.props.match.params

    try {
      const pollRes = await getPoll(slug)
      const combinationRes = await getNextCombination(sessionId)

      this.setState({
        poll: pollRes.data,
        combination: combinationRes.data,
      })
    } catch(err) {
      console.log(err)
      alert(err)
    }
  }

  render() {
    const { poll, combination } = this.state
    if (!poll || !combination) {
      return null
    }

    return (
      <div className="VotePage">
        <NavBar />

        <div>
          <h2>Click the image to choose</h2>
        </div>

        <ul>
          {
            _.map(this.state.combination.targets, (target) => {
              return <li key={target.id} onClick={() => this.onImageClick(target.id)}>
                <img src={target.imageUrl} alt="" />
              </li>
            })
          }
        </ul>

        <Footer />
      </div>
    )
  }

  onImageClick = (targetId) => {
    const { sessionId } = this.props.match.params
    const { poll } = this.state
    console.log('Post')

    const otherTargets = _.filter(this.state.combination.targets, t => t.id !== targetId)
    // position: 1, means they were all the 2nd best, if the winner was 1st
    const others = _.map(otherTargets, t => ({ id: t.id, position: 1 }))
    const vote = {
      targets: [{ id: targetId, position: 0 }].concat(others),
    }
    postVote(sessionId, vote)
      .then((res) => {
        return getNextCombination(sessionId)
      })
      .then((res) => {
        if (res.status === 204) {
          this.props.history.push(`/polls/${poll.id}/results`)
          return
        }
        this.setState({
          combination: res.data,
        })
      })
      .catch(err => {
        alert(err)
      })
  }

}

export default VotePage;
