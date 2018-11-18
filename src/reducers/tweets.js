import { RECEIVE_TWEETS, TOGGLE_TWEET, NEW_TWEET } from '../actions/tweets'

export default function receiveTweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.filter(uid => uid !== action.authedUser)
                        : state[action.id].likes.concat([action.authedUser])
                }
            }
        case NEW_TWEET:
            const tweet = action.tweet

            let replyingTo = {}
            console.log(state[tweet.replyingTo])
            if(tweet.replyingTo !== null){
                replyingTo = {
                    [tweet.replyingTo]: {
                        ...state[tweet.replyingTo],
                        replies: state[tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
                console.log('Vá entender??: ',replyingTo)
            }

            var obj = {
                ...state,
                [action.tweet.id]: action.tweet,
                ...replyingTo
            }

            console.log('Saida: ', obj)
            return obj
        default:
            return state
    }
}
