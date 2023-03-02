import "./TestModule.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAppointments, fetchUserAppointments, getAppointments } from "../../store/appointment"
import { getCurrentUser } from "../../store/session"
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'


const TestModule = () => {
  const dispatch = useDispatch()
  const appointments = useSelector(getAppointments)
  const currentUser = useSelector(getCurrentUser)


  useEffect(() => {
    // dispatch(fetchUserAppointments(currentUser.id))
    dispatch(fetchAppointments(currentUser.id))
  }, [])


  return (
    <>

    </>
  )
}

export default TestModule