import "./AgentShowPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../store/appointment";


const AgentShowPage = () => {
  const dispatch = useDispatch()
  // const appointments = useSelector(getAppointments)
  // const appointment = useSelector(getAppointment(1))
  const today = new Date();

  const appointmentMaker = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const appoint = { agent_id: 2, listing_id: 2, date_time: "2019-03-25T12:00:00Z" }
    dispatch(createAppointment(appoint))
  }
  

  const appointmentDeleter = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(deleteAppointment(4))
  }

  useEffect(()=>{
    // dispatch(fetchAppointments())
    // dispatch(fetchAppointment(1))
  },[dispatch])

  return (
    <>
      <datalist id="Appointment-Times">
        <option label="Midnight">00:00</option>
        <option>06:00</option>
        <option label="Noon">12:00</option>
        <option>18:00</option>
      </datalist>


    <input 
    type="date"
    min={""} />

    <input 
    type="time"
    list="Appointment-Times"/>
      <button onClick={(e)=>appointmentMaker(e)} >Make</button>
      <button onClick={(e)=>appointmentDeleter(e)}>Delete</button>
    </>
  
  )
}

export default AgentShowPage