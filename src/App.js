import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LandingPage from './pages/Landing'
import NewPollPage from './pages/NewPoll'
import SharePollPage from './pages/SharePoll'
import StartVotingPage from './pages/StartVoting'
import PollResultsPage from './pages/PollResults'
import VotePage from './pages/Vote'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/new-poll" component={NewPollPage} />
          <Route exact path="/polls/:slug" component={StartVotingPage} />
          <Route exact path="/polls/:slug/share" component={SharePollPage} />
          <Route exact path="/polls/:slug/results" component={PollResultsPage} />
          <Route exact path="/polls/:slug/vote-sessions/:sessionId" component={VotePage} />
          <Route component={() => <p>404</p>} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App