import { LOGIN, LOGOUT, SET_FILES, SET_LOADING, UPDATE_FILE } from "./action.type"

export const userLogin = (data, dbref) => {
    return {
        type: LOGIN,
        payload: data,
        ref: dbref
    }
}
export const userLogout = (data, dbref) => {
    return {
        type: LOGOUT,
        payload: data,
        ref: dbref
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

export const updateFile = (file, key, fileKey, isUpdate) => {
    return {
        type: UPDATE_FILE,
        payload: file,
        key: key,
        fileKey: fileKey,
        status: isUpdate
    }
}

