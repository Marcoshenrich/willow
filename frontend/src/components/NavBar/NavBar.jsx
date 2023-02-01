import './NavBar.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import SessionModal from '../SessionModal';
import { FixedModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import { clearErrors } from '../../store/errors';
import Icon from "../../assets/icons/icon.png"
import { FaLinkedin, FaGithub } from "react-icons/fa"


const NavBar = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showSessionModal, setShowSessionModal] = useState(false)
    const history = useHistory();
    const currentUser = useSelector(sessionActions.getCurrentUser)

    const routeChangeHome = () => {
        history.push(`/`);
    }

    const routeChangeListings = () => {
        history.push(`/listings`);
    }

    const onSessionModalClose = () => {
        setShowSessionModal(false)
        dispatch(clearErrors())
    }

    const sessionControl = () => {
        if (sessionUser) { 
            return <div onClick={(e) => { routeChangeHome(); logout(e)}}>Log Out</div>
        } else {
            return <div onClick={() => setShowSessionModal(true)}>Sign In</div>
        }
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };


    return (
        <>
        <nav id="NavBar">
            <div id="NavBarLeft">
                <div onClick={routeChangeListings}>Browse Properties</div>
                    <div><a id="Link" target="_blank" href="https://marcoshenrich.github.io/profile/">About Me</a></div>
                    <div><a id="Link" target="_blank" href="https://www.linkedin.com/in/marcos-henrich-794226108/"><FaLinkedin id="Nav-Bar-Icon" /></a></div>
                    <div><a id="Link" target="_blank" href="https://github.com/Marcoshenrich/"><FaGithub id="Nav-Bar-Icon" /></a></div>
            </div>

            <div id="NavBarMid" onClick={routeChangeHome}>
                    <img src={Icon} alt=""/>
                <span>Willow</span>
            </div>

            <div id="NavBarRight">
                <div ><a id="Link" target="_blank" href="https://www.google.com/search?q=A+Midsummer+Night%27s+Dream+tickets+near+me">Dreams</a></div>
                <div ><a id="Link" target="_blank" href="https://en.wikipedia.org/wiki/Fairy">Learn More</a></div>
                {currentUser && (<div ><Link id="Link"  to={`/user/profile`}>Profile</Link></div>)}
                {sessionControl()}
            </div>
        </nav>
            {showSessionModal && (
                <FixedModal onModalClose={onSessionModalClose}>
                    <SessionModal onModalClose={onSessionModalClose} />
                </FixedModal>
            )}
        </>
    )
}

export default NavBar