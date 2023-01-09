import "./LSPAppointmentsManager.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../../store/appointment";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../../store/session";
// import UserAppointmentShow from "../UserAppointmentShow";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { fetchListings, getListings } from "../../../store/listings";
import { fetchFavorites, getFavorites } from "../../../store/favorite";
import ListingModule from "../../ListingModule";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import LSPAMDateBlock from "./LSPAMDateBlock";
import LSPAppointmentsCarousel from "./LSPAppointmentsCarousel";
import LSPAppointmentsTimeContainer from "./LSPAppointmentsTimeContainer";



const LSPAppointmentsManager = ({listing}) => {
  const currentUser = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const agentId = listing.agentId
  const appointments = useSelector(getAppointments)

  const now = new Date();
  const timeStr = now.toISOString().slice(10)
  const today = now.toISOString().slice(0, 10)

  const [date, setDate] = useState(now)
  const [time, setTime] = useState("")

  const appointmentMaker = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: listing.id, date: `${date}`, time:`${time}`}
    dispatch(createAppointment(appoint))
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

  useEffect(()=>{
    dispatch(fetchAppointments())
  },[])

  return (
    <>
      <div id="LSP-Appointments-Container">
        <form>
        <div id="LSPA-h1-Container">
          <div id="LSPA-h1">Pick a date</div>
        </div>
          <LSPAppointmentsCarousel activeDate={date} setActiveDate={setDate} />
        <div id="LSPA-h1-Container-Time">
          <div id="LSPA-h1">Pick a time</div>
        </div>
          <LSPAppointmentsTimeContainer activeTime={time} setActiveTime={setTime} availableTimes={timeAvailabilitySorter()} />
          <div id="LSPA-Submit">
            <div id="LSPA-Submit-Button" onClick={appointmentMaker}>Book Appointment</div>
          </div>
        </form>
      </div>

    </>
  )
}

export default LSPAppointmentsManager
//   //   for calendar
//   //   const [calDate, setCalDate] = useState(new Date())

//   //   const twoMonthsSeed = new Date();
//   //   const twoMonthsRaw = new Date(twoMonthsSeed.setMonth(twoMonthsSeed.getMonth() + 2))
//   //   const twoMonthsFromNow = twoMonthsRaw.toISOString().slice(0, 10)


//   const userAppointments = () => {
//     const userAppointments = []
//     appointments.forEach((appointment) => {
//       if (appointment.userId == currentUser.id) {
//         userAppointments.push(appointment)
//       }
//     })


//     return (
//       userAppointments.map((appointment) =>
//         <UserAppointmentShow appointment={appointment}/>
//       ))
//   }


//   const disabledDates = () => {
//     const disabledDatesUnix = []
//     const moment = new Date();

//     for (let i = 1; i < 65; i++) {

//       let year = moment.getFullYear();
//       let month = moment.getMonth() + 1;
//       let date = moment.getDate();
//       var time = year + '-' + month + '-' + date
//       const updateDate = new Date(time)
//       disabledDatesUnix.push(moment.setTime(updateDate.getTime() + 86400000) - 3600000)
//     }


//     const y = disabledDatesUnix.indexOf(new Date("2023-01-07").getTime() + 86400000) - 3600000
//     disabledDatesUnix.splice(y, 1)


//     const disabledDatesArr = disabledDatesUnix.map((disabledDate)=>
//       new Date(disabledDate)
//     )

    


//     return disabledDatesArr

//   } 