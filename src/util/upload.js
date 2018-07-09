import uuid from 'uuid/v4'
import config from '../config'
import axios from 'axios'

export function uploadFile(file) {
  const opts = {
    headers: {
      'Content-Type': file.type,
    }
  };

  const fullUrl = `${config.REACT_APP_S3_URL}/uploads/${uuid()}`
  return axios.put(fullUrl, file, opts)
    .then(() => fullUrl)
}