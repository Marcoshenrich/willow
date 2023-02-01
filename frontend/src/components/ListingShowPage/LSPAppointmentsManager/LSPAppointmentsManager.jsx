import "./LSPAppointmentsManager.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../../store/appointment";
import { getCurrentUser } from "../../../store/session";
import 'react-calendar/dist/Calendar.css'
import LSPAppointmentsCarousel from "./LSPAppointmentsCarousel";
import LSPAppointmentsTimeContainer from "./LSPAppointmentsTimeContainer";

const LSPAppointmentsManager = ({ listing, setShowSessionModal }) => {
  const currentUser = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const agentId = listing.agentId
  const appointments = useSelector(getAppointments)

  const now = new Date();
  const [showAppointmentModule, setshowAppointmentModule] = useState(true)
  const [appointmentIndex, setAppointmentIndex] = useState(false)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const LSPALoggedOutSignInHandler = (e) =>{
    e.stopPropagation()
    setShowSessionModal(true)
  }

  const appointmentMaker = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: listing.id, date: `${date}`, time:`${time}`}
    if (time) dispatch(createAppointment(appoint))
    setTime("")
    setDate(now)
  }

  const timeAvailabilitySorter = () => {
    const timeSlots = ["08:00", "11:30", "15:00", "18:30"]
    var agentAppointmentsTimes = []
    var userAppointmentsTimes = []

    appointments.forEach((appointment)=>{
      if (appointment.date === date.toISOString().slice(0, 10)) {
        if (appointment.agentId == agentId) {
          agentAppointmentsTimes.push(appointment.time)
        }

        if (appointment.userId == currentUser.id) {
          userAppointmentsTimes.push(appointment.time)
        }
      }
    })

    const availableTimes = []
    timeSlots.forEach((timeSlot) => { 
      if (!agentAppointmentsTimes.includes(timeSlot) && !userAppointmentsTimes.includes(timeSlot)) {
        availableTimes.push(timeSlot)
      }
    })

    return availableTimes
  }

  const appointmentExistsChecker = () => {
    appointments.forEach((appointment, i) => {
      if (appointment.userId == currentUser.id 
        && appointment.listingId == listing.id
        && (Date.parse(`${appointment.date}T${appointment.time}:00`) > now.getTime())
        ) {
          setshowAppointmentModule(false)
          setAppointmentIndex(i)
        return
      }
    })
  }

  const dateParser = (appointment) => {
    let month = appointment.date.slice(6, 7)
    let day = appointment.date.slice(8, 10)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month = months[month - 1]
    if (day[0] === "0") day = day[1]
    return `${month} ${day}`
  }

  const timeParser = (appointment) => {
    let hoursInt = parseInt(appointment.time.slice(0, 2))
    const ampm = hoursInt < 12 ? "AM" : "PM"
    if (hoursInt > 12) {
      hoursInt -= 12
    }
    return `${hoursInt}:${appointment.time.slice(3, 5)} ${ampm}`
  }


  useEffect(()=>{
    dispatch(fetchAppointments())
  },[])

  useEffect(() => {
    if (currentUser) appointmentExistsChecker()
  }, [appointments])

  const deleteAppointmentClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setshowAppointmentModule(true)
    dispatch(deleteAppointment(appointments[appointmentIndex].id))
  }

  return (
    <>
      <div id={showAppointmentModule && currentUser ? "LSP-Appointments-Container" : "LSP-Appointments-Success-Container"}>
        {appointments && currentUser && showAppointmentModule && (
        <form>
        <div id="LSPA-h1-Container">
          <div id="LSPA-h1">Pick a date</div>
        </div>
          <LSPAppointmentsCarousel activeDate={date} setActiveDate={setDate} />
            {date && (<>
            <div id="LSPA-h1-Container-Time">
            <div id="LSPA-h1">Pick a time</div>
            </div>
              <LSPAppointmentsTimeContainer activeTime={time} setActiveTime={setTime} availableTimes={timeAvailabilitySorter()} />
              </>)}
          <div id="LSPA-Submit">
            
            <div id="LSPA-Submit-Button" onClick={appointmentMaker}>Book Appointment</div>
          </div>
          </form>)}
        
        {!showAppointmentModule && (
          <div id="LSPA-Appointment-Success">
            <div>You did it, your next appointment is on</div>
            <div><span id="LSPAAS-Bold">{dateParser(appointments[appointmentIndex])}</span> at <span id="LSPAAS-Bold">{timeParser(appointments[appointmentIndex])}</span> with {appointments[appointmentIndex].agent.username}</div>
            <div id="USAM-Cancel"><button onClick={(e) => deleteAppointmentClick(e)} id="LSPA-Submit-Button">Cancel Appointment</button></div>
          </div>
        )}
        { !currentUser && (
          <div id="LSPA-Appointment-Login-Required">
            <div><span id="LSPAAS-Bold" onClick={(e)=>{LSPALoggedOutSignInHandler(e)}}>Sign in</span> to visit your dream home</div>
          </div>
        )}
      </div>

    </>
  )
}

export default LSPAppointmentsManager
