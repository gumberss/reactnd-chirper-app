import { showLoading, hideLoading } from 'react-redux-loading'

import { saveLikeToggle, saveTweet } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const NEW_TWEET = 'NEW_TWEET'

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

function newTweet(tweet) {
    return {
        type: NEW_TWEET,
        tweet
    }
}

export function handleToggleTweet(info) {
    return dispatch => {
        dispatch(toggleTweet(info))
        return saveLikeToggle(info)
            .catch(e => {
                console.error(e)
                dispatch(toggleTweet(info))
                alert('The was a errr liking the tweet. Try again.')
            })
    }

}

export function handleNewTweet(text, replyingTo) {
    return (dispatch, state) => {
        dispatch(showLoading())
        const { authedUser } = state()
        return saveTweet({
            text, 
            author: authedUser,
            replyingTo
        })
            .then(tweet => dispatch(newTweet(tweet)))
            .then(() => dispatch(hideLoading()))
    }
}