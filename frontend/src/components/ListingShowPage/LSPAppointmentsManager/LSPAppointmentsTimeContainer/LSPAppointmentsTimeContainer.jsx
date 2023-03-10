import "./LSPAppointmentsTimeContainer.css"
import LSPAMTimeBlock from "../LSPAMTimeBlock"

const LSPAppointmentsTimeContainer = ({ activeTime, setActiveTime, availableTimes }) => {

  const timeBlockMaker = () => {

    let timeBlocks = availableTimes.map((timeslot, i) => <LSPAMTimeBlock key={i} timeslot={timeslot} activeTime={activeTime} setActiveTime={setActiveTime}/>)
    if (timeBlocks.length) {
      return timeBlocks
    } else {
      return (<div id="LSPA-No-Time-Callout">No timeslots are available for this day</div>)
    }
  }


  return (
    <div id="LSPA-Time-Container">
      {timeBlockMaker()}
    </div>
  )
}

export default LSPAppointmentsTimeContainer