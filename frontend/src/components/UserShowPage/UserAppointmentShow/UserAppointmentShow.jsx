import "./UserAppointmentShow.css"
import { deleteAppointment } from "../../../store/appointment";
import { useDispatch } from "react-redux";

const UserAppointmentShow = ({ appointment }) => {
  const dispatch = useDispatch()

  const dateParser = () => {
    const year = appointment.date.slice(0,4)
    let month = appointment.date.slice(6,7)
    let day = appointment.date.slice(8,10)
    const months = ["January","February","March","April","May","June","July","August", "September", "October", "November", "December"]
    month = months[month - 1]
    if (day[0] === "0") day = day[1]
    return `${month} ${day}, ${year}`
  }

  const timeParser = () => {
    let hoursInt = parseInt(appointment.time.slice(0,2))
    const ampm = hoursInt < 12 ? "AM" : "PM"
    if (hoursInt > 12) {
      hoursInt -= 12
    }
    return `${hoursInt}:${appointment.time.slice(3, 5)} ${ampm}`
  }

  const deleteAppointmentClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteAppointment(appointment.id))
  }



  return (
    <div id="User-Show-Appointment-Module">
      <div id="USAM-Img-Container">
        {appointment && (<img src={appointment.listing.imageUrls[0]} id="USAM-Ext-Img"/>)}
      </div>
      <div>
        <div id="USAM-Name">{appointment.listing.name}</div>
        <div id="USAM-Date">Date: {dateParser()} at {timeParser()}</div>
        <div id="USAM-Agent-Info">Agent: {appointment.agent.username} </div>
        <button onClick={(e) => deleteAppointmentClick(e)} id="USAM-Button">I can no longer make it</button>
      </div>
    </div>
  )
}

export default UserAppointmentShow