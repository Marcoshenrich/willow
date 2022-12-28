import "./SessionModal.css"
import {HiOutlineX} from "react-icons/hi"
import { useState } from "react"
import SignupFormPage from "./SignupFormPage"
import LoginFormPage from "./LoginFormPage"

const SessionModal = () => {
  const [sessionType, setSessionType] = useState("login")

  return (
    <>
      <div class="modal">
        <div class="modal-content">
          <div id="modalTopline">
            <div></div>
            <h2>Welcome to Willow</h2>
            <HiOutlineX id="modal-x"/>
          </div>
          <div id="sessionType" >
            <button onClick={() => { setSessionType("login") }}>Sign In</button>
            <button onClick={() => { setSessionType("signup") }}>New Account</button>
          </div>
          {sessionType === "login" && (<LoginFormPage/>)}
          {sessionType === "signup" && (<SignupFormPage />)}
        </div>
      </div>
    </>
  )
}

export default SessionModal