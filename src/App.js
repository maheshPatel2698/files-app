import React from 'react'
import Header from './Components/Header'
import AddFile from './Pages/AddFile'
import Files from './Pages/Files'
import ViewSingleFile from './Pages/ViewSingleFile'
import Home from './Pages/Home'
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css"
const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addfile' element={<AddFile />} />
        <Route path='/files' element={<Files />} />
        <Route path='/view' element={<ViewSingleFile />} />
      </Routes>
    </>
  )
}

export default App