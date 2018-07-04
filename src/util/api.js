import axios from 'axios';
import config from '../config';

export function postPoll(poll) {
  console.log('url', `${config.REACT_APP_API_URL}/api/polls`)
  return axios.post(`${config.REACT_APP_API_URL}/api/polls`, poll);
}

export function getPoll(pollSlug) {
  return axios.get(`${config.REACT_APP_API_URL}/api/polls/${pollSlug}`);
}

export function postVoteSession(pollId) {
  return axios.post(`${config.REACT_APP_API_URL}/api/polls/${pollId}/vote-sessions`);
}

export function postVote(sessionId, vote) {
  return axios.post(`${config.REACT_APP_API_URL}/api/vote-sessions/${sessionId}/votes`, vote);
}

export function getNextCombination(sessionId) {
  return axios.get(`${config.REACT_APP_API_URL}/api/vote-sessions/${sessionId}/next-combination`);
}
