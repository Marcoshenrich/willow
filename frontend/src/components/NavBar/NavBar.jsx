import { useState } from 'react';
import SessionModal from '../SessionModal';
import { Modal } from '../../context/Modal';
import './NavBar.css';

const NavBar = () => {
    const [showSessionModal, setShowSessionModal] = useState(false)
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
                Willow
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