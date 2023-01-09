import "./LSPAppointmentsCarousel.css"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import LSPAMDateBlock from "../LSPAMDateBlock"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Moment from 'react-moment';


const LSPAppointmentsCarousel = () => {

  const dispatch = useDispatch()
  const [dateQueue, setDateQueue] = useState([])
  const [favoriteQueuePointer, setFavoriteQueuePointer] = useState(6)
  const [activeDate, setActiveDate] = useState("")

  const now = new Date()
  const timeStr = now.toISOString().slice(10)
  const today = now.toISOString().slice(0, 10)

  const dateQueueMaker = () => {
    let nowClone = new Date()
    let i = 0
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = []
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = []
    const weekday = [] 

    while (i < 5) {
      day.push(nowClone.getDate())
      month.push(months[nowClone.getMonth()])
      weekday.push(daysInWeek[nowClone.getDay()])
      nowClone.setDate(nowClone.getDate() + 1);
      i++
    }

    return [day, weekday, month]

  }

  // useEffect(() => {
  //   setDateQueue()
  // }, [])


  const placeDateBlocks = () => {
    const [day, weekday, month] = dateQueueMaker()
      return (
        day.map((dayInteger, i) =>
          <LSPAMDateBlock key={i} day={dayInteger} month={month[i]} weekday={weekday[i]} activeDate={activeDate} setActiveDate={[setActiveDate]} />)
      )
  }



  const negModuloHander = (pointer, queueLen) => {
    let remain = pointer % queueLen;
    let check = Math.floor(remain >= 0 ? remain : remain + queueLen)
    return check
  }


  const carouselClickHandler = (e) => {
    // e.stopPropagation()
    // let favoriteQueueclone = favoriteQueue.slice()
    // if (e.currentTarget.id.slice(0, 4) === "Left") {
    //   favoriteQueueclone.pop()
    //   favoriteQueueclone.unshift(favorites[negModuloHander(favoriteQueuePointer - 3, favorites.length)])
    //   setFavoriteQueuePointer(favoriteQueuePointer - 1)
    // } else {
    //   favoriteQueueclone.shift()
    //   favoriteQueueclone.push(favorites[negModuloHander(favoriteQueuePointer + 1, favorites.length)])
    //   setFavoriteQueuePointer(favoriteQueuePointer + 1)
    // }
    // setFavoriteQueue(favoriteQueueclone)
  }

  const dateToFormat = '1976-04-19T12:59-0500';




  return (
    <div id="LSPA-Carousel">
      <BsChevronLeft id="Left-LSPA-Carousel-Icon" />
      {placeDateBlocks()}
      {/* <LSPAMDateBlock />
      <LSPAMDateBlock />
      <LSPAMDateBlock />

      <Moment format="YYYY/MM/DD" >{dateToFormat}</Moment>
      <LSPAMDateBlock />
      <LSPAMDateBlock />
      <LSPAMDateBlock /> */}
      <BsChevronRight id="Right-LSPA-Carousel-Icon" />
    </div>
  )
}

export default LSPAppointmentsCarousel