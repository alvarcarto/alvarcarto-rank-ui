import React from 'react'
import { createJunctionTemplate, createPageTemplate } from 'junctions'
import LandingPage from './pages/Landing'
import NewPollPage from './pages/NewPoll'
import SharePollPage from './pages/SharePoll'
import StartVotingPage from './pages/StartVoting'
import App from './App'

const AppJunctionTemplate = createJunctionTemplate({
  children: {
    '/': createPageTemplate({
      title: 'Sifty',
      component: () => <LandingPage />
    }),

    '/new-poll': createPageTemplate({
      title: 'Sifty - Create a new poll',
      component: () => <NewPollPage />
    }),

    '/polls/:slug': createPageTemplate({
      title: 'Sifty - Start voting',
      params: ['slug'],
      component: ({ page }) => <StartVotingPage page={page} />
    }),

    '/polls/:slug/share': createPageTemplate({
      title: 'Sifty - Share your poll',
      params: ['slug'],
      component: ({ page }) => <SharePollPage page={page} />
    }),
  },

  component: App,
})

export default AppJunctionTemplate
