import { DARK_MODE_OFF, DARK_MODE_ON, LOGIN, LOGOUT, SET_FILES, SET_LOADING, UPDATE_FILE } from "./action.type"

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


export const DarkModeOn = (status, value) => {
    return {
        type: DARK_MODE_ON,
        payload: value,
        status: status

    }
}

export const DarkModeOff = (status, value) => {
    return {
        type: DARK_MODE_OFF,
        payload: value,
        status: status,
    }

}