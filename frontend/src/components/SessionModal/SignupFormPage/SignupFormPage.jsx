import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUpErrors } from "../../../store/errors";
import * as sessionActions from "../../../store/session";
import './SignupForm.css';


function SignupFormPage({ onSessionModalClose }) {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors.signUpErrors);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(sessionActions.signup({ email, username, password }))
        } else {
            dispatch(signUpErrors(["Passwords don't match"]))
        }
    };

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
            <div id="Fairy-Godmother-Signup">
                <label><input type="checkbox" value="" /><span>I am a Fairy Godmother</span></label>
            </div>
            {errors && (
                <ul id="Sign-Up-Errors">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>)
            }
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;