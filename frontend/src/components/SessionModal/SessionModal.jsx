import "./SessionModal.css"
import {HiOutlineX} from "react-icons/hi"
import { useState } from "react"
import SignupFormPage from "./SignupFormPage"
import LoginFormPage from "./LoginFormPage"

const SessionModal = ({ onSessionModalClose }) => {
  const [sessionType, setSessionType] = useState("login")

  const sessionTypeClickHandler = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    const signInButton = document.getElementById("signInButton")
    const signUpButton = document.getElementById("signUpButton")
    if (e.target === signInButton) {
      signInButton.className = "selected"
      signUpButton.className = ""
      setSessionType("login")
    } else if (e.target === signUpButton) {
      signUpButton.className = "selected"
      signInButton.className = ""
      setSessionType("signup")
    }
  }

  return (
    <>
      <div id="Session-Modal-Content">
        <div></div>
        <h2>Welcome to Willow</h2>
        <HiOutlineX id="modal-x" onClick={onSessionModalClose}/>
      </div>
      <div id="sessionType" >
        <button id="signInButton" onClick={sessionTypeClickHandler } className="selected">Sign In</button>
        <button id="signUpButton" onClick={sessionTypeClickHandler }>New Account</button>
      </div>
      {sessionType === "login" && (<LoginFormPage onSessionModalClose={onSessionModalClose}/>)}
      {sessionType === "signup" && (<SignupFormPage onSessionModalClose={onSessionModalClose} />)}
    </>
  )
}

export default SessionModal