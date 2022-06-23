import { DARK_MODE_ON, DARK_MODE_OFF } from "../actions/action.type";

const checkDakMode = () => {
    const dark = localStorage.getItem('dark')
    if (dark) {
        return JSON.parse(dark)
    }
    else {
        return null
    }
}
const initialState = {
    Dark: checkDakMode(),
    status: false
}
const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case DARK_MODE_ON:
            return {
                ...state,
                Dark: action.payload,
                status: action.status
            }

        case DARK_MODE_OFF:
            return {
                ...state,
                Dark: action.payload,
                status: action.status
            }
        default:
            return state
    }
}

export default darkModeReducer;
