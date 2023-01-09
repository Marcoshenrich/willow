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



const LSPAppointmentsManager = ({listing}) => {
  const dispatch = useDispatch()
  const { agentId } = listing.agentId
  const appointments = useSelector(getAppointments)
  const currentUser = useSelector(getCurrentUser)

  const now = new Date();
  const timeStr = now.toISOString().slice(10)
  const today = now.toISOString().slice(0, 10)

  const [date, setDate] = useState(today)
  const [time, setTime] = useState(timeStr)

  const appointmentMaker = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: listing.id, date: `${date}`, time:`${time}`}
    setTime("")
    dispatch(createAppointment(appoint))
  }

  const agentAvailabilitySorter = () => {
    const timeSlots = ["08:00", "11:30", "15:00", "18:30"]
    var appointmentsTimes = []

    appointments.forEach((appointment)=>{
      if (appointment.agentId == agentId && appointment.date === date) {
        appointmentsTimes.push(appointment.time)
      }
    })

    const available_times = []
    timeSlots.forEach((timeSlot) => { 
      if (!appointmentsTimes.includes(timeSlot)) {
        available_times.push(timeSlot)
      }
    })

    return(
      available_times.map((available_time, i ) => 
        <option key={i} >{available_time}</option>
    ))
  }

  useEffect(()=>{
    dispatch(fetchAppointments())
  },[dispatch])

  return (
    <>
      <div id="LSP-Appointments-Container">
          {/* <form action="">
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => { setDate(e.target.value) }} />
            <button onClick={(e) => appointmentMaker(e)} >Make</button>
          </form> */}

        <div id="LSPA-h1-Container">
          <div id="LSPA-h1">Pick a date</div>
        </div>
        <LSPAppointmentsCarousel/>
        <div id="LSPA-h1-Container">
          <div id="LSPA-h1">Pick a time</div>
        </div>
        <LSPAppointmentsCarousel />
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

//     console.log(userAppointments)

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
//       console.log(time)
//       const updateDate = new Date(time)
//       disabledDatesUnix.push(moment.setTime(updateDate.getTime() + 86400000) - 3600000)
//     }

//     console.log(disabledDatesUnix)

//     const y = disabledDatesUnix.indexOf(new Date("2023-01-07").getTime() + 86400000) - 3600000
//     console.log(y)
//     disabledDatesUnix.splice(y, 1)


//     const disabledDatesArr = disabledDatesUnix.map((disabledDate)=>
//       new Date(disabledDate)
//     )

    


//     return disabledDatesArr

//   } 