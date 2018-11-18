import React, { Component } from 'react';
import { connect } from 'react-redux'

import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'

import { formatTweet, formatDate } from '../utils/helpers'

import { handleToggleTweet } from '../actions/tweets'

class Tweet extends Component {

  toParent = (e, parentId) => {
    e.preventDefault()
  }

  handleLike = e => {
    e.preventDefault()
    const { dispatch, tweet, authedUser } = this.props

    dispatch(handleToggleTweet({
      id: tweet.id,
      authedUser,
      hasLiked: tweet.hasLiked
    }))
  }

  render() {

    const { tweet } = this.props

    if (!tweet) {
      return <p> This tweet doesn't exists</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, parent
    } = tweet

    return (
      <div className="tweet">
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className="avatar"
        />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked
                ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                : <TiHeartOutline className="tweet-icon" />
              }
            </button>
            <span>{likes !== 0 && likes}</span>

          </div>
        </div>
      </div>);
  }
}

function mapStateToProps(state, props) {

  const { authedUser, tweets, users } = state
  const { tweetId } = props

  const tweet = tweets[tweetId]

  const parent = tweet ? tweets[tweet.replyingTo] : null
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweets[tweetId], users[tweet.author], authedUser, parent)
      : null

  }
}

export default connect(mapStateToProps)(Tweet)