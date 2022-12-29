import './LoginForm.css';
import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation()
        dispatch(sessionActions.login({ credential: "PeriwinkleStar", password: "password" }))
    }

    return (

        <form onSubmit={handleSubmit} className="Login-Form">
            {errors[0] && (<ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>)}
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
            <button className="Login-Button" id="Demo-User-Button" onClick={demoLogin}>Log In As Demo User</button>
            <button className="Login-Button">Log In</button>
        </form>
    );
}

export default LoginFormPage;