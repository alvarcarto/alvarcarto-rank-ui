import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const PollInfo = styled.div`
  background: #f4f4f4;
  padding: 20px 20px;
  border-radius: 5px;
  margin-bottom: 40px;

  p, h4 {
    margin: 0;
    padding: 0;
  }

  h4 {
    width: 120px;
  }
  p {
    flex-shrink: 1;
    max-width: 400px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
  }
  div:not(:last-child) {
    margin-bottom: 20px;
  }
`

const Text = styled.p`
  margin: 0;
`

export default (props) => <PollInfo>
  <div>
    <h4>Poll</h4>
    <Text>{_.get(props.poll, 'title')}</Text>
  </div>

  <div>
    <h4>Description</h4>
    <Text>{_.get(props.poll, 'description', 'No description provided.')}</Text>
  </div>
</PollInfo>
