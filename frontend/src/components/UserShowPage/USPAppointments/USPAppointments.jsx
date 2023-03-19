import "./USPAppointments.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserAppointments, getAppointments } from "../../../store/appointment"
import { getCurrentUser } from "../../../store/session"
import UserAppointmentModule from "./UserAppointmentModule"
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'



const USPAppointments = () => {
  const dispatch = useDispatch()
  const appointments = useSelector(getAppointments)
  const currentUser = useSelector(getCurrentUser)

  useEffect(() => {
    dispatch(fetchUserAppointments(currentUser.id))
  }, [])

  const userAppointments = () => {
    const userAppointmentsArr = []
    appointments.forEach((appointment) => {
      if (appointment.userId == currentUser.id) {
        userAppointmentsArr.push(appointment)
      }
    })

    return (
      userAppointmentsArr.map((appointment) =>
        <UserAppointmentModule appointment={appointment} />
      )
    )
  }

  return (
    <div className="USP-Appointments">
        {(appointments.length > 0) && (
          <div id="USP-Appointments-Show-Container"> 
            <div id="USP-Appointments-Show">{userAppointments()}</div>
          </div>
        )}
        {(appointments.length === 0) && (
          <div id="USP-No-Appointments-Container">
            <div id="USP-No-Appointments-Body" >Looks like you don't have any appointments yet.</div>
            <Link to="/listings"><div id="USP-No-Appointments-Link">Browse properties</div></Link>
          </div>
        )}
    </div>
  )
}

export default USPAppointments