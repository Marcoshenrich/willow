import LSPAMTimeBlock from "../../../../ListingShowPage/LSPAppointmentsManager/LSPAMTimeBlock"
import "./UATimeContainer.css"

const UserAppointmentsTimeContainer = ({ activeTime, setActiveTime, availableTimes }) => {

  let timeBlocks = availableTimes.map((timeslot, i) => <LSPAMTimeBlock key={i} timeslot={timeslot} activeTime={activeTime} setActiveTime={setActiveTime} />)

  return (
    <>
      {timeBlocks.length > 0 && (
      <div id="UA-Time-Container">
        {timeBlocks}
      </div>)
      }
      {timeBlocks.length === 0 && (
        <div id="UA-No-Time-Callout">No timeslots are available for this day</div>
      )}
    </>
  )
}

export default UserAppointmentsTimeContainer