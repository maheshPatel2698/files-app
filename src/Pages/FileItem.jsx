import React, { useState } from 'react'
import { Table } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'

import { FaFileDownload, FaPen } from "react-icons/fa"
import { setFiles, updateFile } from "../Redux/actions/actions"
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import { AiFillDelete } from "react-icons/ai"
import { toast } from "react-toastify"
import "../Css/Fi.css"
import { useNavigate } from "react-router-dom"

const FileItem = () => {
    const { Files } = useSelector(state => state.fileReducer)
    const { Dbref } = useSelector(state => state.userReducer)
    const { Dark } = useSelector(state => state.darkModeReducer)
    const [searchValue, setSearchvalue] = useState("")
    const dispatch = useDispatch()
    let navigate = useNavigate()


    const handleSearch = async () => {
        const dbref = firebase.database().ref(Dbref).child('Files/')
        await dbref.orderByChild("contractNumber").equalTo(searchValue)
            .on('value', snapshot => {
                dispatch(setFiles(snapshot.val()))
            })
        setSearchvalue("")
    }

    const handleDelete = (DeleteKey, FileKey) => {
        let isExecuted = window.confirm("Are you sure you want to delete Data  ?")
        if (isExecuted) {
            const dbRef = firebase.database().ref(Dbref).child(`Files/${DeleteKey}`)
            dbRef.remove()
                .then(() => {
                    toast.success("Deleted SuccessFully !",
                        {
                            autoClose: 500,
                            closeButton: false,
                            position: "top-right"
                        }
                    )
                }).catch((err) => {
                    console.log(err)
                })
            const stRef = firebase.storage().ref(Dbref).child(`Files/${FileKey}`)
            stRef.delete().then(() => {
                console.log("Deleted")
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            alert("Action Cancelled ! ")
        }
    }
    const downloadFile = (url) => {
        window.location.href = url
    }


    const handleUpdate = (file, key, fileKey, isUpdate) => {
        dispatch(updateFile(file, key, fileKey, isUpdate))
        navigate('/addfile')

    }
    return (
        <div>
            <div className='idiv' style={Dark}>
                <input className='in'
                    placeholder='Search GEM Contract Number Here'
                    value={searchValue} onChange={e => setSearchvalue(e.currentTarget.value)} type="text" />
                <button id='btn' onClick={handleSearch} className='btn btn-primary'>Find</button>

            </div>
            <Table striped bordered hover responsive style={Dark}>
                <thead>
                    <tr>
                        <th colSpan={5} >GEM Contract NO</th>
                        <th >Contact Number</th>
                        <th >AlterNative Number</th>
                        <th>Location</th>
                        <th>Tracking Number</th>
                        <th>Tracking Status</th>
                        <th>Bill</th>
                        <th>Bill No</th>
                        <th>Bill Amout</th>
                        <th>CRAC status</th>
                        <th>Payment Status</th>
                        <th>Delete</th>
                        <th>Edit</th>

                    </tr>
                </thead>
                <tbody>
                    {Files === null ? <tr>
                        <td>There is no Data</td>
                    </tr> : Object.entries(Files).map(([key, value]) => {
                        return (
                            <tr key={key} className="t">
                                <td colSpan={5} >{value?.contractNumber}</td>
                                <td >{value?.contactNumber}</td>
                                <td >{value?.AltContactNumber}</td>
                                <td>{value?.location}</td>
                                <td>{value?.location}</td>
                                <td>{value?.trackingStatus}</td>
                                <td  ><FaFileDownload onClick={() => downloadFile(value?.downloadUrl)} /></td>
                                <td>{value?.billNumber}</td>
                                <td> {value?.billAmount}</td>
                                <td>{value?.crac}</td>
                                <td>{value?.paymentStatus}</td>
                                <td> <AiFillDelete onClick={() => handleDelete(key, value?.billName)} size={22} />  </td>
                                <td> <FaPen onClick={() => handleUpdate(value, key, value?.billName, true)} size={22} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default FileItem