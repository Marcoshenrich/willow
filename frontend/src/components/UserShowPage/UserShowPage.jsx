import "./UserShowPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../store/appointment";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import UserAppointmentShow from "../UserAppointmentShow";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { fetchListings, getListings } from "../../store/listings";
import { fetchFavorites, getFavorites } from "../../store/favorite";
import ListingModule from "../ListingModule";
import { BsChevronLeft, BsChevronRight} from "react-icons/bs"



const UserShowPage = () => { 

  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)
  const currentUser = useSelector(getCurrentUser)
  const [favoriteQueue, setFavoriteQueue] = useState([])
  const [showFavoriteQueue, setShowFavoriteQueue] = useState(false)
  const [favoriteQueuePointer, setFavoriteQueuePointer] = useState(2)

  useEffect(() => {
    dispatch(fetchFavorites(currentUser.id))
    dispatch(fetchListings())
    setFavoriteQueue(favorites.slice(0, 3))
  }, [])

  useEffect(() => {
    setFavoriteQueue(favorites.slice(0, 3))
    if (favoriteQueue.length) {
      setShowFavoriteQueue(true)
    } else if (!favoriteQueue) {
      setShowFavoriteQueue(false)
    }
  }, [favorites])


  const placeListingModules = () => {
    if (listings.length > 0 && favorites && favoriteQueue) {
      return (
        favoriteQueue.map((favorite) => 
          <ListingModule listing={listings[favorite.listingId - 1]} favoriteId={favorite.id} />)
      )
    }
  }

  const negModuloHander = (pointer, queueLen) =>{
    let remain = pointer % queueLen;
    let check = Math.floor(remain >= 0 ? remain : remain + queueLen)
    return check
  }

  const carouselClickHandler = (e) => {
    e.stopPropagation()
    let favoriteQueueclone = favoriteQueue.slice()
    if (e.currentTarget.id.slice(0, 4) === "Left") {
      favoriteQueueclone.pop()
      favoriteQueueclone.unshift(favorites[negModuloHander(favoriteQueuePointer - 3, favorites.length)])
      setFavoriteQueuePointer(favoriteQueuePointer - 1)
    } else {
      favoriteQueueclone.shift()
      favoriteQueueclone.push(favorites[negModuloHander(favoriteQueuePointer + 1, favorites.length)])
      setFavoriteQueuePointer(favoriteQueuePointer + 1)
    }
    setFavoriteQueue(favoriteQueueclone)
  }


  return (
    <div className="User-Show-Page">  
      <div className="USP-Appointments">

      </div>
      <div className="USP-Favorites">
        <div id="USP-Favorites-Header">You loved...</div>
        { showFavoriteQueue && (
          <div className="USP-Favorited-Carousel">
            {favorites.length > 3 && (<div className="USP-Carousel-Button" id="Left-USP-Carousel-Button" onClick={(e) => carouselClickHandler(e)}><BsChevronLeft className="USP-Carousel-Button-Icon" /></div>)}
            {placeListingModules()}
            {favorites.length > 3 && (<div className="USP-Carousel-Button" id="Right-USP-Carousel-Button" onClick={(e) => carouselClickHandler(e)}><BsChevronRight className="USP-Carousel-Button-Icon" /></div>)}
          </div>
        )}
        {!showFavoriteQueue && (
        <div id="USP-Favorites-None-Body">
          <div>Uh oh, looks like you haven't found any homes you love yet</div>
          <div>Find the perfect home</div>
        </div> )}
      </div>

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

//   const appointmentMaker = (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     const appoint = { agent_id: agentId, listing_id: 2, date: `${date}`, time:`${time}`}
//     setTime("")
//     dispatch(createAppointment(appoint))
//   }

//   const appointmentScheduleFinder = (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     const appoint = { agent_id: agentId, listing_id: 2, date_time: `${date}-${time}` }
//     dispatch(fetchAppointment(appoint))
//   }

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
//         <div>
//           <div>Your Appointments:</div>
//           {appointments && (<div>{userAppointments()}</div>)}
//         </div>
//       </div>

//     </>
  
//   )
// }

export default UserShowPage