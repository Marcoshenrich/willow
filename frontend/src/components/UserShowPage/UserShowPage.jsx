import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAppointments, getAppointments } from "../../store/appointment"
import { getCurrentUser } from "../../store/session"
import UserAppointmentModule from "./UserAppointmentModule"
import "./UserShowPage.css"
import USPFavorites from "./USPFavorites"
import { Link } from "react-router-dom";

const UserShowPage = () => { 
  const dispatch = useDispatch()
  const appointments = useSelector(getAppointments)
  const currentUser = useSelector(getCurrentUser)

  useEffect(()=>{
    dispatch(fetchAppointments())
  },[])

    const userAppointments = () => {
      const userAppointmentsArr = []
      appointments.forEach((appointment) => {
        if (appointment.userId == currentUser.id) {
          userAppointmentsArr.push(appointment)
        }
    })
    
    return (
      userAppointmentsArr.map((appointment)=>
        <UserAppointmentModule appointment = { appointment }/>
      )
    )
  }

  return (
    <div className="User-Show-Page">
      <div className="USP-Appointments">
        <div id="USP-Appointments-Header">Your Appointments:</div>
        <div id="USP-Appointments-Container">
          {(appointments.length > 0) && (
            <>
              <div id="USP-Appointments-Show">{(userAppointments())}</div>
            </>
        )}
          {(appointments.length === 0) && (
            <div id="USP-No-Appointments-Container">
              <div id="USP-No-Appointments-Body" >Looks like you don't have any appointments yet.</div>
              <Link to="/listings"><div id="USP-No-Appointments-Link">Browse properties</div></Link>
            </div>
          )}
        </div>
      </div>
    <USPFavorites />
    </div>
  )
}






















// const UserShowPage = () => {
//   const dispatch = useDispatch()
//   const { agentId } = useParams()
//   const appointments = useSelector(getAppointments)
//   const currentUser = useSelector(getCurrentUser)

//   //for calendar
//   const [calDate, setCalDate] = useState(new Date())

//   const twoMonthsSeed = new Date();
//   const twoMonthsRaw = new Date(twoMonthsSeed.setMonth(twoMonthsSeed.getMonth() + 2))
//   const twoMonthsFromNow = twoMonthsRaw.toISOString().slice(0, 10)


//   const now = new Date();
//   const timeStr = now.toISOString().slice(10)
//   const today = now.toISOString().slice(0, 10)




//   const [date, setDate] = useState(today)
//   const [time, setTime] = useState(timeStr)

//   const appointmentDeleter = (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     dispatch(deleteAppointment(4))
//   }

//   useEffect(()=>{
//     dispatch(fetchAppointments())
//   },[dispatch])


//   const agentAvailabilitySorter = () => {
//     const timeSlots = ["08:00", "11:30", "15:00", "18:30"]
//     var appointmentsTimes = []

//     appointments.forEach((appointment)=>{
//       if (appointment.agentId == agentId && appointment.date === date) {
//         appointmentsTimes.push(appointment.time)
//       }
//     })

//     const available_times = []
//     timeSlots.forEach((timeSlot) => { 
//       if (!appointmentsTimes.includes(timeSlot)) {
//         available_times.push(timeSlot)
//       }
//     })

//     return(
//       available_times.map((available_time, i ) => 
        
//         <option key={i} >{available_time}</option>
//     ))

//   }




//     return (
//       userAppointments.map((appointment) =>
//         <UserAppointmentShow appointment={appointment}/>
//       ))
//   }


//     const y = disabledDatesUnix.indexOf(new Date("2023-01-07").getTime() + 86400000) - 3600000
//     disabledDatesUnix.splice(y, 1)


//     const disabledDatesArr = disabledDatesUnix.map((disabledDate)=>
//       new Date(disabledDate)
//     )

    


//     return disabledDatesArr

//   } 
  
//   return (
//     <>
//       <datalist id="Appointment-Times">
//         {agentAvailabilitySorter()}
//         <div> no times are available </div>
//       </datalist>

//     <select name="" id="">
//       <option value="">holla</option>
//         <option value="">holla</option>
//         <option value="">holla</option>
//         <option value="">holla</option>
//     </select>

//     <form action="">
//     <input 
//     type="date"
//     value={date}
//     min={today}
//     onChange={(e) => { setDate(e.target.value) }}
//     />

    

//     <input 
//     type="time"
//     list="Appointment-Times"
//     value={time}
//     onChange={(e) => { setTime(e.target.value) }}
//     />
//       <button onClick={(e)=>appointmentMaker(e)} >Make</button>
//       </form>
//       <button onClick={(e)=>appointmentDeleter(e)}>Delete</button>

//       <div id="User-Appointment-Widget">
//         <div id="Calendar-Container">
//           <Calendar 
          
//           onChange={setCalDate} 
//           value={calDate} 
//             maxDate={new Date(twoMonthsFromNow)}
//             minDate={new Date()}
          
          
//           tileDisabled={({ date, view }) =>
//             (view === 'month') && // Block day tiles only
//             disabledDates().some(disabledDate =>
//               date.getFullYear() === disabledDate.getFullYear() &&
//               date.getMonth() === disabledDate.getMonth() &&
//               date.getDate() === disabledDate.getDate()
//             )} />
//         </div>

//       </div>

//     </>
  
//   )
// }

export default UserShowPage