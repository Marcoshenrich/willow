import "./LSPAppointmentsCarousel.css"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import LSPAMDateBlock from "../LSPAMDateBlock"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Moment from 'react-moment';
import LSPAMTimeBlock from "../LSPAMTimeBlock/LSPAMTimeBlock"
import Carousel from 'react-elastic-carousel';



const LSPAppointmentsCarousel = ({ activeDate, setActiveDate }) => {

  const dispatch = useDispatch()

  const now = new Date()

  const dateQueueMaker = () => {
    let nowClone = new Date()
    let i = 0
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = []
    const month = []
    const weekday = [] 
    const year = [] 

    while (i < 14) {
      nowClone.setDate(nowClone.getDate() + 1);
      day.push(nowClone.getDate())
      month.push(nowClone.getMonth())
      weekday.push(daysInWeek[nowClone.getDay()])
      year.push(nowClone.getFullYear())
      i++
    }
    return [day, weekday, month, year]

  }


  const placeDateBlocks = () => {
    const [day, weekday, month, year] = dateQueueMaker()
      return (
        day.map((dayInteger, i) =>
          <LSPAMDateBlock key={i} day={dayInteger} month={month[i]} weekday={weekday[i]} year={year[i]} activeDate={activeDate} setActiveDate={setActiveDate} />)
      )
  }

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 100, itemsToShow: 4, itemsToScroll: 4 },
    { width: 400, itemsToShow: 5, itemsToScroll: 5 }
  ];

  return (
    <div id="LSPA-Carousel">
      <Carousel breakPoints={breakPoints}>
        {placeDateBlocks()}
      </Carousel>
    </div>
  )
}

export default LSPAppointmentsCarousel