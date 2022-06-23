import React, { useEffect } from 'react'
import Header from './Components/Header'
import AddFile from './Pages/AddFile'
import Files from './Pages/Files'

import Home from './Pages/Home'

import { setLoading, setFiles } from './Redux/actions/actions'
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"
import { useSelector, useDispatch } from 'react-redux'
import firebase from "firebase/compat/app"
import "firebase/compat/database"

const App = () => {
  const dispatch = useDispatch()
  const { Dbref } = useSelector(state => state.userReducer)
  const getAllData = async () => {
    dispatch(setLoading(true))
    const ref = firebase.database().ref(Dbref).child('Files')
    ref.on('value', (snapshot) => {
      dispatch(setFiles(snapshot.val()))
    })
    dispatch(setLoading(false))
  }
  useEffect(() => {
    if (Dbref === null) {
      return
    }
    else {
      getAllData()
    }
  }, [Dbref])
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addfile' element={<AddFile />} />
        <Route path='/files' element={<Files />} />
      </Routes>
    </>
  )
}

export default App