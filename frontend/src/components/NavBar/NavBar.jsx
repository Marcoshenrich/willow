import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import SessionModal from '../SessionModal';
import { FixedModal } from '../../context/Modal';
import './NavBar.css';
import Icon from "../assets/icons/icon.png"
import { Link, useHistory } from 'react-router-dom';
import { clearErrors } from '../../store/errors';

const NavBar = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showSessionModal, setShowSessionModal] = useState(false)
    const history = useHistory();

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
            return <div onClick={(e) => logout(e)}>Log Out</div>
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
                <div onClick={routeChangeListings}>Buy</div>
                <div onClick={routeChangeListings}>Rent</div>
                <div>Sell</div>
                <div>Home Loans</div>
                <div>Agent Finder</div>
            </div>

            <div id="NavBarMid">
                    <img src={Icon} alt="" onClick={routeChangeHome}/>
                <span>Willow</span>
            </div>

            <div id="NavBarRight">
                <div>Manage Rentals</div>
                <div>Advertise</div>
                <div><Link to={`/user/profile`}>Help</Link></div>
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