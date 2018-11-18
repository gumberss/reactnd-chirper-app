export const RECEIVE_AUTHED_USER_ID = 'RECEIVE_AUTHED_USER_ID'

export function receiveAuthedUserId(id){
    return {
        type: RECEIVE_AUTHED_USER_ID,
        id
    }
}