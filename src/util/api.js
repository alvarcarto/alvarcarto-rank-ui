import axios from 'axios';
import config from '../config';

export function postPoll(poll) {
  return axios.post(`${config.REACT_APP_API_URL}/api/polls`, poll);
}
