import "./AgentShowPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../store/appointment";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import UserAppointmentShow from "../UserAppointmentShow";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'

const AgentShowPage = () => {
  const dispatch = useDispatch()
  const { agentId } = useParams()
  const appointments = useSelector(getAppointments)
  const currentUser = useSelector(getCurrentUser)

  //for calendar
  const [calDate, setCalDate] = useState(new Date())

  const twoMonthsSeed = new Date();
  const twoMonthsRaw = new Date(twoMonthsSeed.setMonth(twoMonthsSeed.getMonth() + 2))
  const twoMonthsFromNow = twoMonthsRaw.toISOString().slice(0, 10)




  console.log(twoMonthsFromNow)

  const now = new Date();
  const timeStr = now.toISOString().slice(10)
  const today = now.toISOString().slice(0, 10)

  console.log(today)



  const [date, setDate] = useState(today)
  const [time, setTime] = useState(timeStr)

  const appointmentMaker = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: 2, date: `${date}`, time:`${time}`}
    setTime("")
    dispatch(createAppointment(appoint))
  }

  const appointmentScheduleFinder = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: 2, date_time: `${date}-${time}` }
    dispatch(fetchAppointment(appoint))
  }

  const appointmentDeleter = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(deleteAppointment(4))
  }

  useEffect(()=>{
    dispatch(fetchAppointments())
  },[dispatch])


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

  const userAppointments = () => {
    const userAppointments = []
    appointments.forEach((appointment) => {
      if (appointment.userId == currentUser.id) {
        userAppointments.push(appointment)
      }
    })

    console.log(userAppointments)

    return (
      userAppointments.map((appointment) =>
        <UserAppointmentShow appointment={appointment}/>
      ))
  }


  const disabledDates = () => {
    const disabledDatesUnix = []
    const moment = new Date();

    for (let i = 1; i < 65; i++) {

      let year = moment.getFullYear();
      let month = moment.getMonth() + 1;
      let date = moment.getDate();
      var time = year + '-' + month + '-' + date
      console.log(time)
      const updateDate = new Date(time)
      disabledDatesUnix.push(moment.setTime(updateDate.getTime() + 86400000) - 3600000)
    }

    console.log(disabledDatesUnix)

    const y = disabledDatesUnix.indexOf(new Date("2023-01-07").getTime() + 86400000) - 3600000
    console.log(y)
    disabledDatesUnix.splice(y, 1)


    const disabledDatesArr = disabledDatesUnix.map((disabledDate)=>
      new Date(disabledDate)
    )

    


    return disabledDatesArr

  } 
  
  return (
    <>
      <datalist id="Appointment-Times">
        {agentAvailabilitySorter()}
        <div> no times are available </div>
      </datalist>

    <select name="" id="">
      <option value="">holla</option>
        <option value="">holla</option>
        <option value="">holla</option>
        <option value="">holla</option>
    </select>

    <form action="">
    <input 
    type="date"
    value={date}
    min={today}
    onChange={(e) => { setDate(e.target.value) }}
    />

    

    <input 
    type="time"
    list="Appointment-Times"
    value={time}
    onChange={(e) => { setTime(e.target.value) }}
    />
      <button onClick={(e)=>appointmentMaker(e)} >Make</button>
      </form>
      <button onClick={(e)=>appointmentDeleter(e)}>Delete</button>

      <div id="User-Appointment-Widget">
        <div id="Calendar-Container">
          <Calendar 
          
          onChange={setCalDate} 
          value={calDate} 
            maxDate={new Date(twoMonthsFromNow)}
            minDate={new Date()}
          
          
          tileDisabled={({ date, view }) =>
            (view === 'month') && // Block day tiles only
            disabledDates().some(disabledDate =>
              date.getFullYear() === disabledDate.getFullYear() &&
              date.getMonth() === disabledDate.getMonth() &&
              date.getDate() === disabledDate.getDate()
            )} />
        </div>
        <div>
          <div>Your Appointments:</div>
          {appointments && (<div>{userAppointments()}</div>)}
        </div>
      </div>

    </>
  
  )
}

export default AgentShowPage