import "./UserShowPage.css"
import USPFavorites from "./USPFavorites"
import USPAppointments from "./USPAppointments"
import Map from "../Map"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getPrunedListings, fetchListings, searchListings, rerenderListings, getListings } from "../../store/listings"
import { fetchFavorites } from "../../store/favorite"
import { getCurrentUser } from "../../store/session"
import { fetchUserAppointments } from "../../store/appointment"
import USPAccount from "./USPAccount"

const UserShowPage = () => { 

  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const [selectedList, setSelectedList] = useState("Appointments")
  const listings = useSelector(getPrunedListings(selectedList, currentUser))

  useEffect(()=>{
    dispatch(fetchListings())
    dispatch(fetchFavorites(currentUser.id))
    dispatch(fetchUserAppointments(currentUser.id))
  },[])

  const toggleSelector = (e) => {
    setSelectedList(e.target.innerText)
  }


  return (
    <>
      <div className="User-Show-Page">
        <div className="USP-Panels">
          <div id="USP-Map">
            <Map iconDisplay={selectedList} listings={listings}/>
          </div>
          <div id="USP-Nav">
            <div id="USP-Header">
              <h2>{currentUser.username}'s Page</h2>
            </div>
            <div id="USP-Nav-Toggle-Container">
              <div onClick={toggleSelector} className={selectedList === "Appointments" ? "USP-Toggle-Selected" : "USP-Toggle-Unselected" }>Appointments</div>
              <div onClick={toggleSelector} className={selectedList === "Favorites" ? "USP-Toggle-Selected" : "USP-Toggle-Unselected"}>Favorites</div>
              <div onClick={toggleSelector} className={selectedList === "Your Account" ? "USP-Toggle-Selected" : "USP-Toggle-Unselected"}>Your Account</div>
            </div>
            {selectedList === "Appointments" && (<USPAppointments/>)}
            {selectedList === "Favorites" && (<USPFavorites />)}
            {selectedList === "Your Account" && (<USPAccount />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserShowPage