import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import config from '../config'

const RateScaleContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 0;
  position: relative;
  margin-bottom: 40px;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li, ul img {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  li {
    transition: transform 1s ease, left 1s ease, opacity 1s ease;
    transform: translateX(-50%);
    position: absolute;
    z-index: 1;
  }
  li:hover {
    z-index: 4;
  }
  li img {
    transition: transform 0.2s ease;
  }
  li img:hover {
    cursor: pointer;
    transform: translateY(-7px);
  }
`
const ArrowContainer = styled.div`
  width: 100%;
  position: relative;
  top: 8px;

  p {
    font-size: 0.9rem;
    color: #666;
  }
`
const LeftLabel = styled.p`
  position: absolute;
  left: 1px;
  bottom: -43px;
`
const RightLabel = styled.p`
  position: absolute;
  right: 3px;
  bottom: -43px;
`
const ArrowImg = styled.img`
  position: absolute;
  width: 10px;
  right: 0;
`
const ArrowLine = styled.div`
  position: absolute;
  bottom: -6px;
  height: 2px;
  background: #bbb;
  width: calc(100% - 10px);
`

class RateScale extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animate: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true })
    }, 400)
  }

  render() {
    const { props } = this
    const targets = _.sortBy(props.poll.targets, t => t.score)
    const hasVotes = (_.sumBy(targets, 'wins') + _.sumBy(targets, 'losses')) > 0

    return <RateScaleContainer>
      <ul>
        {
          _.map(targets, target => {
            const style = this.getStyle(target, hasVotes)
            return <li style={style} key={target.id}>
              <img src={target.imageUrl} alt="" />
            </li>
          })
        }
      </ul>

      <ArrowContainer>
        <ArrowLine />
        <ArrowImg src={`${config.PUBLIC_URL}/assets/triangle.svg`} alt="" />
        <LeftLabel>loser</LeftLabel>
        <RightLabel>winner</RightLabel>
      </ArrowContainer>
    </RateScaleContainer>
  }

  getStyle(target, hasVotes) {
    if (!this.state.animate || !hasVotes) {
      return {
        left: '0%',
        transform: 'translateX(0%)',
        opacity: hasVotes ? 0 : 0.2,
      }
    }

    const { targets } = this.props.poll
    const minScore = _.minBy(targets, t => t.score).score
    const maxScore = _.maxBy(targets, t => t.score).score
    const range = maxScore - minScore

    const left = (target.score -minScore) / range * 100
    const style = {
      left: `${left}%`,
      opacity: 1,
    }

    if (left < 0.001) {
      // TODO: browser prefixes
      style.transform = 'translateX(0)'
    } else if (left > 99.999) {
      style.transform = 'translateX(-100%)'
    } else {
      style.transform = 'translateX(-50%)'
    }
    return style
  }
}

export default RateScale;
