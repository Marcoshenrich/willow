import "./UserAppointmentModule.css"
import { deleteAppointment, updateAppointment, getAppointments, fetchAppointments } from "../../../../store/appointment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../store/session";
import UserAppointmentsTimeContainer from "./UATimeContainer/UATimeContainer";


const UserAppointmentModule = ({ appointment }) => {
  const appointments = useSelector(getAppointments)
  const currentUser = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const [time, setTime] = useState("")
  const [showUpdateTime, setShowUpdateTime] = useState("")
  

  const dateParser = () => {
    let [year, month, day] = appointment.date.split("-")
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

  const updateTimeClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowUpdateTime((showUpdateTime) => !showUpdateTime)

    if (time && showUpdateTime) {
      const updatedAppointment = { 
        id: appointment.id, 
        listingId: appointment.listingId, 
        userId: appointment.userId, 
        date: appointment.date,
        time
      }
      dispatch(updateAppointment(updatedAppointment))
    } else {
      
    }
  }

  const deleteAppointmentClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(deleteAppointment(appointment.id))
  }

  const timeAvailabilitySorter = () => {
    const timeSlots = ["08:00", "11:30", "15:00", "18:30"]
    var agentApptsTimes = []
    var userApptsTimes = []

    appointments.forEach((storeAppt) => {
      if (storeAppt.date === appointment.date) {
        if (storeAppt.agentId == appointment.agentId) {
          agentApptsTimes.push(storeAppt.time)
        }

        if (storeAppt.userId == currentUser.id) {
          userApptsTimes.push(storeAppt.time)
        }
      }
    })

    const availableTimes = []
    timeSlots.forEach((timeSlot) => {
      if (!agentApptsTimes.includes(timeSlot) && !userApptsTimes.includes(timeSlot)) {
        availableTimes.push(timeSlot)
      }
    })

    return availableTimes
  }

  return (
    <div id="User-Show-Appointment-Module">
        <div id="USAM-Name">{appointment.listing.name}</div>
        <div id="USAM-Date">Date: {dateParser()} at {timeParser()}</div>
        <div id="USAM-Agent-Info">Agent: {appointment.agent.username} </div>
      {showUpdateTime && (<UserAppointmentsTimeContainer activeTime={time} setActiveTime={setTime} availableTimes={timeAvailabilitySorter()} />)}
      <div id="USAM-Edit"><button onClick={(e) => updateTimeClick(e)} id="USAM-Edit-Submit">{(time && showUpdateTime) ? "Change Time" : "Reschedule" }</button></div>
      <div id="USAM-Cancel"><button onClick={deleteAppointmentClick} id="USAM-Cancel-Submit">Cancel Appointment</button></div>
    </div>
  )
}

export default UserAppointmentModule