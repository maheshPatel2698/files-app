import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom"
import "../Css/AddFile.css"


import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/database"
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { updateFile } from "../Redux/actions/actions"
import { Spinner } from "react-bootstrap"

const AddFile = () => {
    const dispatch = useDispatch()
    const { User, Dbref } = useSelector(state => state.userReducer)
    const { FIleToUpdate, FileToUpdateKey, FileKey, isUpdate } = useSelector(state => state.fileReducer)
    const { Dark } = useSelector(state => state.darkModeReducer)
    const [contractNumber, setContractNumber] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [AltContactNumber, setAltContactNumber] = useState("")
    const [location, setLocation] = useState("")
    const [trackingNumber, setTrackingNumber] = useState("")
    const [deliveryPartner, setDeliverPartner] = useState("")
    const [trackingStatus, setTrackingStatus] = useState("")
    const [billNumber, setBillNumber] = useState("")
    const [billAmount, setBillAmount] = useState("")
    const [crac, setCracStatus] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [billName, setBillName] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("")

    useEffect(() => {
        if (FIleToUpdate) {
            setContractNumber(FIleToUpdate?.contractNumber)
            setContactNumber(FIleToUpdate?.contactNumber)
            setAltContactNumber(FIleToUpdate?.AltContactNumber)
            setLocation(FIleToUpdate?.location)
            setTrackingNumber(FIleToUpdate?.trackingNumber)
            setDeliverPartner(FIleToUpdate?.deliveryPartner)
            setTrackingStatus(FIleToUpdate?.trackingStatus)
            setBillNumber(FIleToUpdate?.billNumber)
            setBillAmount(FIleToUpdate?.billAmount)
            setCracStatus(FIleToUpdate?.crac)
            setPaymentStatus(FIleToUpdate?.paymentStatus)
            setBillName(FIleToUpdate?.billName)
            setDownloadUrl(FIleToUpdate?.downloadUrl)

        }
    }, [FIleToUpdate])

    const updateFiles = () => {
        try {
            const firebaseRef = firebase.database().ref(Dbref)
            firebaseRef.child('Files/' + FileToUpdateKey)
                .set({
                    contractNumber,
                    contactNumber,
                    AltContactNumber,
                    location,
                    trackingNumber,
                    deliveryPartner,
                    trackingStatus,
                    billNumber,
                    billAmount,
                    crac,
                    paymentStatus,
                    billName,
                    downloadUrl
                })
                .then(() => {
                    toast.success("Data Uploaded !",
                        {
                            autoClose: 500,
                            position: "top-right",
                            closeButton: false
                        }
                    )
                })
            setContractNumber("")
            setContactNumber("")
            setAltContactNumber("")
            setLocation("")
            setTrackingNumber("")
            setDeliverPartner("")
            setTrackingStatus("")
            setBillNumber("")
            setBillAmount("")
            setCracStatus("")
            setPaymentStatus("")
            setBillName("")
            setDownloadUrl("")
        } catch (error) {
            console.log(error)
        }


    }
    const [isUploading, setIsUploading] = useState(false)
    const filePicker = async (e) => {
        try {
            setIsUploading(true)
            if (isUpdate) {
                const bill = e.target.files[0]
                const storageRef = firebase.storage().ref(Dbref).child('Files/' + FileKey)
                await storageRef.put(bill)
                await storageRef.getDownloadURL()
                    .then((url) => {
                        setDownloadUrl(url)
                        toast.success("fileUpdaload", { autoClose: 500, closeButton: false, position: "top-right" })
                    })
                    .catch((err) => console.log(err))
                const filename = storageRef.name
                setBillName(filename)
                setIsUploading(false)
            }
            else {
                const bill = e.target.files[0]
                const storageRef = firebase.storage().ref(Dbref).child('Files/' + v4())
                await storageRef.put(bill)
                await storageRef.getDownloadURL()
                    .then((url) => {
                        setDownloadUrl(url)
                        toast.success("fileUpdaload", { autoClose: 500, closeButton: false, position: "top-right" })
                    })
                    .catch((err) => console.log(err))
                const filename = storageRef.name
                setBillName(filename)
                setIsUploading(false)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const addFile = () => {
        try {
            const firebaseRef = firebase.database().ref(Dbref)
            firebaseRef.child('Files/' + v4())
                .set({
                    contractNumber,
                    contactNumber,
                    AltContactNumber,
                    location,
                    trackingNumber,
                    deliveryPartner,
                    trackingStatus,
                    billNumber,
                    billAmount,
                    crac,
                    paymentStatus,
                    billName,
                    downloadUrl
                })
                .then(() => {
                    toast.success("Data Uploaded !",
                        {
                            autoClose: 500,
                            position: "top-right",
                            closeButton: false
                        }
                    )
                })
            setContractNumber("")
            setContactNumber("")
            setAltContactNumber("")
            setLocation("")
            setTrackingNumber("")
            setDeliverPartner("")
            setTrackingStatus("")
            setBillNumber("")
            setBillAmount("")
            setCracStatus("")
            setPaymentStatus("")
            setBillName("")
            setDownloadUrl("")
        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        isUpdate ? updateFiles() : addFile()
        dispatch(updateFile(null, null, null, null))
    }



    if (!User?.email) {
        return <Navigate to="/" />
    }

    else {
        return (
            <div className="formContainer" >

                <form onSubmit={handleSubmit} style={Dark}>
                    <h4>Customer Details</h4>
                    <label htmlFor="Contract Number">Contract Number</label>
                    <input type="value"
                        name='contractNumber'
                        id='contractNumber'
                        placeholder='Type Contract Number Here starts with 5116877-'
                        value={contractNumber}
                        onChange={e => setContractNumber(e.target.value)}

                    />
                    <label htmlFor="Contract Number">Contact Number</label>
                    <input type="value"
                        name='Contact Number'
                        id='Contact Number'
                        placeholder='Type contact number'
                        value={contactNumber}
                        onChange={e => setContactNumber(e.target.value)}
                    />
                    <label htmlFor="Contract Number">Alternative Contact Number</label>
                    <input type="value"
                        name='Alternative Contact Number'
                        id='Alternative Contact Number'
                        placeholder='Type Alt Contact Number'
                        value={AltContactNumber}
                        onChange={e => setAltContactNumber(e.target.value)}

                    />
                    <label htmlFor="Contract Number">Location</label>
                    <input type="value"
                        name='Location'
                        id='Location'
                        placeholder='Type delivery location'
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    <label htmlFor="delivery partner">Delivery Partner</label>
                    <input type="value"
                        name='dp'
                        id='dp'
                        placeholder='Type your delivery partner'
                        value={deliveryPartner}
                        onChange={e => setDeliverPartner(e.target.value)}
                    />
                    <label htmlFor="Contract Number">Tracking Number</label>
                    <input type="value"
                        name='Tracking Number'
                        id='Tracking Number'
                        placeholder='Type your tracking number'
                        value={trackingNumber}
                        onChange={e => setTrackingNumber(e.target.value)}
                    />

                    <label htmlFor="Contract Number">Tracking Status</label>
                    <input type="value"
                        name='Tracking Status'
                        id='Tracking Status'
                        placeholder='Type tracking status'
                        value={trackingStatus}
                        onChange={e => setTrackingStatus(e.target.value)}
                    />
                    <h4>Bill & Payment status</h4>

                    <label htmlFor="Contract Number">{isUploading ? <Spinner animation="border" variant="primary" /> : "Bill"}</label>
                    <input type="file"
                        name='Bill'
                        accept='pdf/*'
                        id='Bill'
                        required
                        placeholder='Add bill in  pdf format'
                        onChange={filePicker}

                    />
                    <label htmlFor="Contract Number">Bill No</label>
                    <input type="value"
                        name='Bill No'
                        id="Bill No"
                        placeholder='Type your bill Number'
                        value={billNumber}
                        onChange={e => setBillNumber(e.target.value)}


                    />
                    <label htmlFor="Contract Number">Bill Amount</label>
                    <input type="value"
                        name='Bill Amount'
                        id='Bill Amount'
                        placeholder='Type our bill amount'
                        value={billAmount}
                        onChange={e => setBillAmount(e.target.value)}

                    />
                    <label htmlFor="Contract Number">CRAC Status</label>
                    <input type="value"
                        name='crac'
                        id='crac'

                        placeholder='Type crac status'
                        value={crac}
                        onChange={e => setCracStatus(e.target.value)}

                    />
                    <label htmlFor="Contract Number">Payment Status</label>
                    <input type="value"
                        name='paymentStatus'
                        id='paymentStatus'

                        placeholder='Type your payment status'
                        value={paymentStatus}
                        onChange={e => setPaymentStatus(e.target.value)}
                    />
                    <button type='submit' className="btn btn-primary m-2">{isUpdate ? "Update Data" : "Add Data"}</button>
                </form>
            </div>
        )

    }
}

export default AddFile