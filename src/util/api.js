import axios from 'axios';
import config from '../config';

export function postPoll(poll) {
  return axios.post(`${config.REACT_APP_API_URL}/api/polls`, poll);
}

export function getPoll(pollSlug) {
  return axios.get(`${config.REACT_APP_API_URL}/api/polls/${pollSlug}`);
}

export function postVoteSession(pollId) {
  return axios.post(`${config.REACT_APP_API_URL}/api/polls/${pollId}/vote-sessions`);
}
