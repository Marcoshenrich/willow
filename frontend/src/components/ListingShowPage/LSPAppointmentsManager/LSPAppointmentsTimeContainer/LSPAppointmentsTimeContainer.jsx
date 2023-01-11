import "./LSPAppointmentsTimeContainer.css"
import LSPAMTimeBlock from "../LSPAMTimeBlock"

const LSPAppointmentsTimeContainer = ({ activeTime, setActiveTime, availableTimes }) => {

  const timeBlockMaker = () => {
    return (
      availableTimes.map((timeslot, i) => <LSPAMTimeBlock key={i} timeslot={timeslot} activeTime={activeTime} setActiveTime={setActiveTime} />)
    )
  }


  return (
    <div id="LSPA-Time-Container">
      {timeBlockMaker()}
    </div>
  )
}

export default LSPAppointmentsTimeContainer