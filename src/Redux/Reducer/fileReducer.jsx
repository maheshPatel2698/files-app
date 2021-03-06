import { SET_FILES, SET_LOADING, UPDATE_FILE } from "../actions/action.type"

const initialState = {
    Files: [],
    FIleToUpdate: null,
    FileToUpdateKey: null,
    FileKey: null,
    isLoading: null,
    isUpdate: null,
    File: {}
}

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return action.payload === null ?
                { ...state, Files: [] }
                :
                { ...state, Files: action.payload }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case UPDATE_FILE:
            return {
                ...state,
                FIleToUpdate: action.payload,
                FileToUpdateKey: action.key,
                FileKey: action.fileKey,
                isUpdate: action.status
            }


        default:
            return state
    }
}

export default fileReducer