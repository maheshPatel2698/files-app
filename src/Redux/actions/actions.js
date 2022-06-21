import { LOGIN, LOGOUT, SET_FILES, SET_LOADING, UPDATE_FILE } from "./action.type"

export const userLogin = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
export const userLogout = (data) => {
    return {
        type: LOGOUT,
        payload: data
    }
}

export const setFiles = (files) => {
    return {
        type: SET_FILES,
        payload: files
    }
}

export const setLoading = (loadingStatus) => {
    return {
        type: SET_LOADING,
        payload: loadingStatus
    }
}

export const updateFile = (file, key) => {
    return {
        type: UPDATE_FILE,
        payload: file,
        key: key
    }
}