const INITIAL_STATE = {
    username:'',
    isLogin:false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLogin:true, username:action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state
    }
}