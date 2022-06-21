import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

const AddFile = () => {
    const { User } = useSelector(state => state.userReducer)

    if (!User?.email) {
        return <Navigate to="/" />
    }
    else {
        return (
            <form>

            </form>
        )

    }
}

export default AddFile