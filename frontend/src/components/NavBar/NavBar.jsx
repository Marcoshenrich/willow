import { useState } from 'react';
import SessionModal from '../SessionModal';
import { Modal } from '../../context/Modal';
import './NavBar.css';
import Icon from "../assets/icons/icon.png"
import { Link, useHistory } from 'react-router-dom';

const NavBar = () => {
    const [showSessionModal, setShowSessionModal] = useState(false)
    const history = useHistory();
    const routeChange = () => {
        history.push(`/`);
    }

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
                <div onClick={()=>setShowSessionModal(true)}>Sign In</div>
            </div>
        </nav>
            {showSessionModal && (
                <Modal onClose={() => setShowSessionModal(false)}>
                    <SessionModal />
                </Modal>
            )}
        </>
    )
}

export default NavBar