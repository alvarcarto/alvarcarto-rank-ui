import React, { Component } from 'react';
import _ from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components'
import MdCheckCircle from 'react-icons/lib/md/check-circle'
import Swal from 'sweetalert2'
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { getPoll, getNextCombination, postVote } from '../util/api'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`
const appear = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > * {
    animation: ${appear} 0.5s ease-in-out;
    animation-iteration-count: 1;
  }

  h2 {
    color: #84dab3;
  }
`
const Images = styled.ul`
  margin: 30px 0 0 0;
  list-style: none;
  display: flex;
  padding: 0 5px;

  img {
    padding: 5px;
    width: 100%;
    max-width: 350px;
    cursor: pointer;
    border: 3px solid rgba(0, 0, 0, 0);
  }

  img:hover {
    border: 3px solid #6980F3;
    border-radius: 3px;
  }
`

const CheckIcon = styled(MdCheckCircle)`
  margin-top: 100px;
  width: 100px;
  height: 100px;
  fill: #84dab3;

  svg {
    width: 100%;
    height: 100%;
  }
`

class VotePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      finished: false,
      poll: null,
      combination: null,
    }
  }

  async componentDidMount() {
    const { slug, sessionId } = this.props.match.params

    try {
      const pollRes = await getPoll(slug)
      const poll = pollRes.data
      const combinationRes = await getNextCombination(sessionId)
      if (combinationRes.status === 204) {
        return this.moveToResults(poll)
      }

      this.setState({
        poll,
        combination: combinationRes.data,
      })
    } catch(err) {
      console.log(err)
      alert(err)
    }
  }

  render() {
    const { poll, combination } = this.state
    if (!poll || !combination) {
      return null
    }

    return (
      <div className="VotePage">
        <NavBar />

        <Content>
          <div>
            {
              this.state.finished
                ? <IconContainer>
                    <CheckIcon />
                    <h2>Done!</h2>
                  </IconContainer>
                : <h2>Click the better one</h2>
            }
          </div>

          {!this.state.finished ?
            <Images>
              <TransitionGroup component={null}>
                {
                  _.map(combination.targets, (target) => {
                    return <CSSTransition key={target.id} timeout={{ enter: 250, exit: 150 }} classNames="appear">
                      <li onClick={() => this.onImageClick(target.id)}>
                        <img src={target.imageUrl} alt="" />
                      </li>
                    </CSSTransition>
                  })
                }
              </TransitionGroup>
            </Images>
            : null
          }
        </Content>
      </div>
    )
  }

  onImageClick = (targetId) => {
    const { sessionId } = this.props.match.params
    const { poll } = this.state

    this.setState({
      combination: { targets: [] },
    })

    const otherTargets = _.filter(this.state.combination.targets, t => t.id !== targetId)
    // position: 1, means they were all the 2nd best, if the winner was 1st
    const others = _.map(otherTargets, t => ({ id: t.id, position: 1 }))
    const vote = {
      targets: [{ id: targetId, position: 0 }].concat(others),
    }

    postVote(sessionId, vote)
      .then((res) => {
        return getNextCombination(sessionId)
      })
      .then((res) => {
        if (res.status === 204) {
          return this.moveToResults(poll)
        }
        setTimeout(() => {
          this.setState({
            combination: res.data,
          })
        }, 150)

      })
      .catch(err => {
        alert(err)
      })
  }

  moveToResults(poll) {
    this.setState({
      finished: true
    })
    setTimeout(() => {
      this.props.history.push(`/polls/${poll.slug}/results`)
    }, 1500)
  }
}

export default VotePage;
