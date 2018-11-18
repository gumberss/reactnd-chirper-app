import { RECEIVE_AUTHED_USER_ID } from '../actions/authedUser'

export default function receiveAuthedUserId(state = null, action) {
    switch (action.type) {
        case RECEIVE_AUTHED_USER_ID:
            return action.id
        default:
            return state

    }
}