import "./AgentShowPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../store/appointment";
import { useParams } from "react-router-dom";


const AgentShowPage = () => {
  const dispatch = useDispatch()
  const { agentId } = useParams()
  const appointments = useSelector(getAppointments)
  // const appointments = useSelector(getAppointments)
  // const appointment = useSelector(getAppointment(1))
  const yesterday_seed = new Date();
  const yesterday_raw = new Date(yesterday_seed.setDate(yesterday_seed.getDate() - 1));
  const yesterday = yesterday_raw.toISOString().slice(0, 10)

  const now = new Date();
  const timeStr = now.toISOString().slice(10)
  const today = now.toISOString().slice(0, 10)

  const [date, setDate] = useState(today)
  const [time, setTime] = useState(timeStr)

  const appointmentMaker = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: 2, date_time: `${date}-${time}` }
    console.log(appoint)
    dispatch(createAppointment(appoint))
  }

  const appointmentScheduleFinder = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: agentId, listing_id: 2, date_time: `${date}-${time}` }
    dispatch(fetchAppointment(appoint))
  }
  
  console.log(appointments)

  const appointmentDeleter = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(deleteAppointment(4))
  }

  useEffect(()=>{
    dispatch(fetchAppointments())
    // dispatch(fetchAppointment(1))
  },[dispatch])


  // get the appointments for that agent of the date value
  // if an appointment exists in that timeslot, do NOT render option

  return (
    <>
      <datalist id="Appointment-Times">
        { false && (<option>08:00</option>)}
        <option { ...true && ("disabled")}>11:30</option>
        <option>15:00</option>
        <option>18:30</option>
      </datalist>

    <form action="">
    <input 
    type="date"
    value={date}
    onChange={(e) => { setDate(e.target.value) }}
    />

    <input 
    type="time"
    list="Appointment-Times"
    value={time}
    onChange={(e) => { setTime(e.target.value); console.log(time) }}
    />
      <button onClick={(e)=>appointmentMaker(e)} >Make</button>
      </form>
      <button onClick={(e)=>appointmentDeleter(e)}>Delete</button>
      {/* {appointments && (<div>{appointments[1].id}</div>)} */}
    </>
  
  )
}

export default AgentShowPage