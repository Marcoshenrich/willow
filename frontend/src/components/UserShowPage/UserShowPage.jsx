import "./UserShowPage.css"
import USPFavorites from "./USPFavorites"
import USPAppointments from "./USPAppointments"
import Map from "../Map"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getSortedListings, fetchListings, searchListings, rerenderListings } from "../../store/listings"
import { fetchFavorites } from "../../store/favorite"
import { clearErrors } from "../../store/errors"
import { getCurrentUser } from "../../store/session"
import SessionModal from '../SessionModal';
import { FixedModal } from '../../context/Modal';

const UserShowPage = () => { 

  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const [selectedList, setSelectedList] = useState("Appointments")


  const toggleSelector = (e) => {
    setSelectedList(e.target.innerText)
  }
  // className = "USP-Toggle-Selected"
  return (
    <>
      <div className="User-Show-Page">
        <div className="USP-Panels">
          <div id="USP-Map">
            <Map />
          </div>
          <div id="USP-Nav">
            <div id="USP-Header">
              <h2>{currentUser.username}'s Page</h2>
            </div>
            <div id="USP-Nav-Toggle-Container">
              <div onClick={toggleSelector} className={selectedList === "Appointments" ? "USP-Toggle-Selected" : "USP-Toggle-Unselected" }>Appointments</div>
              <div onClick={toggleSelector} className={selectedList === "Favorites" ? "USP-Toggle-Selected" : "USP-Toggle-Unselected"}>Favorites</div>
              <div onClick={toggleSelector} className={selectedList === "Your Stats" ? "USP-Toggle-Selected" : "USP-Toggle-Unselected"}>Your Stats</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserShowPage