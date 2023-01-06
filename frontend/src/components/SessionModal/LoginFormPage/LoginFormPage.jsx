import './LoginForm.css';
import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage({ onSessionModalClose }) {
    const dispatch = useDispatch();
    const loginErrors = useSelector(state => state.errors.loginErrors);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation()
        dispatch(sessionActions.login({ credential, password })).then((res) => { if (res.ok) onSessionModalClose() })
    }


    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation()
        dispatch(sessionActions.login({ credential: "Heleynore", password: "password" }))
        onSessionModalClose()
    }

    return (

        <form onSubmit={handleSubmit} className="Login-Form">
            <label>
                Username or Email
                <input
                    type="text"
                    placeholder='Enter username or email'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            {loginErrors && (
            <div id="Login-Errors">
                {loginErrors.map(error => <div key={error}>{error}</div>)}
            </div>)
            }
            <button className="Login-Button" id="Demo-User-Button" onClick={demoLogin}>Log In As Demo User</button>
            <button className="Login-Button">Log In</button>
        </form>
    );
}

export default LoginFormPage;