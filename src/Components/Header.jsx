import React, { useEffect } from 'react'
import { Nav, Navbar, Container } from "react-bootstrap"
import "../Css/Header.css"
import { Link } from "react-router-dom"
import "../../src/index.css"

import { userLogin, userLogout, DarkModeOn, DarkModeOff } from "../Redux/actions/actions"
import { useDispatch, useSelector } from 'react-redux'
import { Image } from "react-bootstrap"
import { toast } from 'react-toastify'
import { FaUser, FaLightbulb } from "react-icons/fa"
import firebase from "firebase/compat/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import firebaseConfig from "../Config/firebaseConfig"
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const Header = () => {
    const dispatch = useDispatch()
    const { User } = useSelector(state => state.userReducer)
    const { Dark, status } = useSelector(state => state.darkModeReducer)
    const body = document.getElementById('body')

    const checkDark = () => {
        const dark = localStorage.getItem('dark')
        if (dark) {
            body.classList.add('body')
        }
        else {
            body.classList.remove('body')
        }
    }

    useEffect(() => {
        checkDark()
    }, [])


    const handleDarkMode = () => {
        if (!status) {
            dispatch(DarkModeOn(true, {
                transition: "all 0.7s ease",
                backgroundColor: "#BB86FC",
                color: "#2F2519"
            }))
            body.classList.add('body')
            localStorage.setItem('body', 'body')
            localStorage.setItem('dark', JSON.stringify({
                transition: "all 0.7s ease",
                backgroundColor: "#BB86FC",
                color: "#2F2519"
            }))
        }
        else {
            dispatch(DarkModeOff(false, { transition: "all 0.7s ease" }))
            localStorage.removeItem('dark')
            body.classList.remove('body')
            localStorage.removeItem('body')
        }
    }
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
                .then((res) => {
                    const user = {
                        name: res.user.displayName,
                        uid: res.user.uid,
                        email: res.user.email,
                        photo: res.user.photoURL,
                        verified: res.user.emailVerified
                    }
                    localStorage.setItem('User', JSON.stringify(user))
                    localStorage.setItem('ref', res.user.displayName)
                    dispatch(userLogin(user, res.user.displayName))

                    toast.success("SuccessFully LoggedIn !",
                        {
                            autoClose: 500,
                            closeButton: false,
                            position: "top-right"
                        }
                    )
                })
                .catch((err) => {
                    console.log(err)
                })

        } catch (error) {
            console.log(error)
        }

    }
    const handleLogOut = () => {
        try {
            dispatch(userLogout(null))
            localStorage.removeItem('User')
            toast.success("SuccessFully Logged Out !",
                {
                    autoClose: 500,
                    closeButton: false,
                    position: "top-right"
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleActions = () => {
        User?.email ? handleLogOut() : handleLogin()
    }
    return (
        <Navbar className="nb" expand="lg" style={Dark}>
            <Container>
                <Navbar.Brand>Files App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item className="nav-link"><Link to="/addfile">Add File</Link></Nav.Item>
                        <Nav.Item className="nav-link"><Link to="/files">Files</Link></Nav.Item>
                        <Nav.Item className="nav-link" onClick={handleActions}>{User?.email ? "Log Out" : "Log In"}</Nav.Item>
                        <Nav.Item className="nav-link">{User?.email ? <Image className="i" loading='lazy' roundedCircle src={User?.photo} /> : <FaUser size={22} />}</Nav.Item>
                        <Nav.Item className="nav-link"> <FaLightbulb onClick={handleDarkMode} size={25} /> </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >

    )
}

export default Header