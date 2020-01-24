import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const RankList = styled.div`

`

const Images = styled.ol`
  list-style: none;
  margin: 10px 0 50px 0;
  padding: 0;

  img {
    max-width: 230px;
    margin: 5px;
    border-radius: 2px;
    align-self: center;
  }

  li {
    counter-increment: item;
    position: relative;
    display: flex;
  }

  li img {
    align-self: center
  }

  li:before {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #6980F3;
    content: counter(item);
    background: white;
    border-radius: 100%;
    font-weight: bold;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${props => props.disabled && `
    li:before {
      content: "?";
    }
  `}
`

const ImagePlaceholder = styled.div`
  width: 230px;
  height: 150px;
  margin: 5px;
  border-radius: 2px;
  background: #eee;
`

const ImageStats = styled.div`
  padding: 4px 0 0 10px;
`

const ImageStat = styled.p`
  margin: 0;
  margin-bottom: 0;
`

export default (props) => {
  const { targets, disabled } = props;

  return (
    <RankList>
      <Images disabled={disabled}>
        {
          _.map(targets, (target) => {
            return <li key={target.id}>
              {
                disabled
                  ? <ImagePlaceholder />
                  : (
                    <React.Fragment>
                      <img src={target.imageUrl} alt="" />
                      <ImageStats>
                        <ImageStat>Score: {target.score}</ImageStat>
                        <ImageStat>Wins: {target.wins}</ImageStat>
                        <ImageStat>Losses: {target.losses}</ImageStat>
                      </ImageStats>
                    </React.Fragment>
                  )
              }
            </li>
          })
        }
      </Images>
    </RankList>
  )
}