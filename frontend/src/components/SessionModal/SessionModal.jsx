import "./SessionModal.css"
import {HiOutlineX} from "react-icons/hi"
import { useState } from "react"
import SignupFormPage from "./SignupFormPage"
import LoginFormPage from "./LoginFormPage"

const SessionModal = ({ setShowSessionModal }) => {
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
      <div class="modal">
        <div class="modal-content">
          <div id="modalTopline">
            <div></div>
            <h2>Welcome to Willow</h2>
            <HiOutlineX id="modal-x" onClick={()=>setShowSessionModal(false)}/>
          </div>
          <div id="sessionType" >
            <button id="signInButton" onClick={sessionTypeClickHandler } className="selected">Sign In</button>
            <button id="signUpButton" onClick={sessionTypeClickHandler }>New Account</button>
          </div>
          {sessionType === "login" && (<LoginFormPage/>)}
          {sessionType === "signup" && (<SignupFormPage />)}
        </div>
      </div>
    </>
  )
}

export default SessionModal