import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'

class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <NavBar />
        <div>
          <p>Easy and intuitive way to rank set of images as a group</p>
          <Link to="/new-poll"><Button onClick={console.log}>Start</Button></Link>
        </div>
        <div>
          <h2>What is Sifty?</h2>
          <p>
            <b>Sifty is an easy and intuitive way to rank set of images as a group.</b>
            For example you can easily find out what would be everyone's favorite cover image
            for your company's Facebook profile.
          </p>
        </div>
        <div>
          <ol>
            <li>
              <h3>Create a poll</h3>
              <img alt="" src="public/create-a-poll.svg" />
            </li>
            <li>
              <h3>Everyone votes</h3>
              <img alt="" src="public/everyone-votes.svg" />
            </li>
            <li>
              <h3>See the results</h3>
              <img alt="" src="public/see-the-results.svg" />
            </li>
          </ol>
        </div>
        <div>
          <h2>Let's get started</h2>
          <Link to="/new-poll"><Button onClick={console.log}>Create a poll</Button></Link>
        </div>

        <Footer />
      </div>
    );
  }
}

export default LandingPage;
