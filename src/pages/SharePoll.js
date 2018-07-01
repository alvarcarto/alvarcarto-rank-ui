import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { Link } from 'react-junctions'

class SharePollPage extends Component {
  render() {
    console.log(this.props)
    const pollSlug = this.props.page.params.slug

    return (
      <div className="SharePollPage">
        <NavBar />

        <div>
          <h2>Share your poll</h2>
          <p>
            Please note that polls are deleted after a week of inactivity.
          </p>
        </div>

        <div>
          <h3>Link for voting</h3>
          <p>Everyone with this link can vote.</p>
          <Link href={`/polls/${pollSlug}`}>https://shifty.co/{pollSlug}</Link>

          <h3>Results</h3>
          <p>See the poll results in real time.</p>
          <Link href={`/polls/${pollSlug}/results`}>https://shifty.co/{pollSlug}/results</Link>
        </div>

        <Footer />
      </div>
    );
  }
}

export default SharePollPage;
