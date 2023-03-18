import { useSelector } from "react-redux"
import { getCurrentUser } from "../../../store/session"
import "./USPAccount.css"
import fairy from "../../../assets/heroes/USPFairyFooter.jpg"
import csrfFetch from "../../../store/csrf"
import { useEffect } from "react"


const USPAccount = () => {
  const currentUser = useSelector(getCurrentUser)

  const fetchUserStats = async () => {
    const response = await csrfFetch(`/api/users/${currentUser.id}/stats`)
    if (response.ok) {
      const data = await response.json();
    }
  };

  useEffect(()=>{
    const stats = fetchUserStats()
    console.log(stats)
  },[])

  return (
    <div className="USP-Account">
      <div className="USP-Body">
        <div className="USP-Account-Details">
          <div id="USP-Details-Header">Account Details</div>
          <div>Email: {currentUser.email}</div>
          <div>Username: {currentUser.username}</div>
        </div>

        <div className="USP-Account-Stats">
          <div id="USP-Details-Header">Your Stats</div>
          <div>Upcoming Appointments:</div>
          <div>Previous Appointments:</div>
          <div>Reviewed:</div>
          <div>Favorited:</div>
        </div>
      </div>

      <div id="USP-Fairy-Footer">
        <img src={fairy} alt="" />
      </div>
    </div>
  )
}

export default USPAccount