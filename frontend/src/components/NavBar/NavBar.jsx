import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import SessionModal from '../SessionModal';
import { Modal } from '../../context/Modal';
import './NavBar.css';
import Icon from "../assets/icons/icon.png"
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [showSessionModal, setShowSessionModal] = useState(false)
    const history = useHistory();
    const routeChange = () => {
        history.push(`/`);
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
                <div>Buy</div>
                <div>Rent</div>
                <div>Sell</div>
                <div>Home Loans</div>
                <div>Agent Finder</div>
            </div>

            <div id="NavBarMid">
                    <img src={Icon} alt="" onClick={routeChange}/>
                <span>Willow</span>
            </div>

            <div id="NavBarRight">
                <div>Manage Rentals</div>
                <div>Advertise</div>
                <div>Help</div>
                {sessionControl()}
            </div>
        </nav>
            {showSessionModal && (
                <Modal onClose={() => setShowSessionModal(false)}>
                    <SessionModal onClose={() => setShowSessionModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default NavBar