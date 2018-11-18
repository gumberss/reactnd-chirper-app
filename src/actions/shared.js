import { showLoading, hideLoading } from 'react-redux-loading'

import { getInitialData } from '../utils/api'

import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { receiveAuthedUserId } from './authedUser'

export const RECEIVE_DATA = 'RECEIVE_DATA'

const authedUserId = 'tylermcginnis'

export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, tweets }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(receiveAuthedUserId(authedUserId))
                dispatch(hideLoading())
            })
    }
}