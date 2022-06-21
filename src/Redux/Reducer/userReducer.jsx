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
const checPrevref = () => {
    const ref = localStorage.getItem('ref')
    if (ref) {
        return ref
    }
    else {
        return null
    }
}
const initialState = {
    User: checPrevuser(),
    Dbref: checPrevref()
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                User: action.payload,
                Dbref: action.ref
            }
        case LOGOUT:
            return {
                ...state,
                User: action.payload,
                Dbref: action.ref
            }
        default:
            return state
    }
}

export default userReducer;
