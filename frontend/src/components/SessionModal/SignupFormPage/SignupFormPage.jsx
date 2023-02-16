import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpErrors } from "../../../store/errors";
import * as sessionActions from "../../../store/session";
import { IoIosCheckmarkCircle } from  "react-icons/io"
import { RiCheckboxBlankCircleLine } from "react-icons/ri"
import './SignupForm.css';


function SignupFormPage({ onModalClose }) {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors.signUpErrors);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (password === confirmPassword) {
            dispatch(sessionActions.signup({ email, username, password })).then((res) => { if (res.ok) onModalClose() })
        } else {
            dispatch(signUpErrors(["Passwords don't match"]))
        }
    };

    const passwordRequirements = () => {
        if (password.length > 0) {
            return (
                <div id="Password-Requirements">
                    {passwordLengthReq()}
                    {passwordMatchReq()}
                </div>
            )
        }
    }

    const passwordLengthReq = () => {
        if (password.length >= 6) {
            return (<span className="green"><div className="Pass-Req-Icon-Container"><IoIosCheckmarkCircle style={{ fontSize: '14px' }} /></div>Password must be at least 6 characters</span>)
        }else{ 
            return (<span className="red"><div className="Pass-Req-Icon-Container"><RiCheckboxBlankCircleLine style={{ fontSize: '13px' }} /></div>Password must be at least 6 characters</span>)
        }
    }

    const passwordMatchReq = () => {
        if (password === confirmPassword) {
            return (<span className="green"><div className="Pass-Req-Icon-Container"><IoIosCheckmarkCircle style={{fontSize: '14px'}} /></div>Passwords must match</span>)
        } else {
            return (<span className="red"><div className="Pass-Req-Icon-Container"><RiCheckboxBlankCircleLine style={{ fontSize: '13px' }} /></div>Passwords must match</span>)
        }
    }

    return (
        <form className="Sign-Up-Form" onSubmit={handleSubmit}>
            <label>
                Email
                <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Username
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {passwordRequirements()}
            <label>
                Confirm Password
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            {errors && (
                <div id="Sign-Up-Errors">
                    {errors.map(error => <div key={error}>{error}</div>)}
                </div>)
            }
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;