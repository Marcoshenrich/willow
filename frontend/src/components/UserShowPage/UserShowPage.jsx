import "./UserShowPage.css"
import USPFavorites from "./USPFavorites"
import USPAppointments from "./USPAppointments"

const UserShowPage = () => { 


  return (
    <div className="User-Show-Page">
    <USPAppointments/>
    <USPFavorites />
    </div>
  )
}

export default UserShowPage