import React from 'react'
import FileItem from './FileItem'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"
import "../Css/Files.css"


const Files = () => {
    const { User } = useSelector(state => state.userReducer)

    if (!User?.email) {
        return <Navigate to="/" />
    }
    else {
        return (
            <div className='files'>
                <FileItem />
            </div>
        )

    }
}

export default Files