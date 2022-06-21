import React from 'react'
import FileItem from './FileItem'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"
const Files = () => {
    const { User } = useSelector(state => state.userReducer)
    if (!User?.email) {
        return <Navigate to="/" />
    }
    else {
        return (
            <div>
                <FileItem />
            </div>
        )

    }
}

export default Files