import React, { Component } from 'react';
import _ from 'lodash'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { getPoll } from '../util/api'

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

    const sortedTargets = _.sortBy(poll.targets, t => t.score)

    return (
      <div className="PollResultsPage">
        <NavBar />

        <div>
          <h2>Results</h2>
        </div>

        <div>
          <ul>
            {
              _.map(sortedTargets, (target) => {
                return <li key={target.id}><img src={target.imageUrl} alt="" /></li>
              })
            }
          </ul>
        </div>

        <Footer />
      </div>
    )
  }
}

export default PollResultsPage;
