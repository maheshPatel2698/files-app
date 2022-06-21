import { LOGIN, LOGOUT } from "../actions/action.type";

const checPrevuser = () => {
    const user = localStorage.getItem('User')
    if (user) {
        return JSON.parse(user)
    }
    else {
        return null
    }
}
const initialState = {
    User: checPrevuser()
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, User: action.payload }
        case LOGOUT:
            return { ...state, User: action.payload }
        default:
            return state
    }
}

export default userReducer;
