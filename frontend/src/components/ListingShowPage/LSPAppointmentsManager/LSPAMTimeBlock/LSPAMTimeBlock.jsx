import "./LSPAMTimeBlock.css"

const LSPAMTimeBlock = ({ timeslot, setActiveTime, activeTime}) => {

  const timeBlockClickHandler = (e) => {
    e.stopPropagation()
    setActiveTime(timeslot)
  }

  const timeParser = (timeslot) => {
    let hoursInt = parseInt(timeslot.slice(0, 2))
    const ampm = hoursInt < 12 ? "AM" : "PM"
    if (hoursInt > 12) {
      hoursInt -= 12
    }
    return `${hoursInt}:${timeslot.slice(3, 5)} ${ampm}`
  }


  return (
    <div id="LSPAM-Time-Block-Wrapper">
      <div id={activeTime === timeslot ? "LSPAM-Time-Block-Active" : "LSPAM-Time-Block"} onClick={timeBlockClickHandler}>
        <div id="LSPAM-Time-Block-Time">{timeParser(timeslot)}</div>
      </div>
    </div>
  )
}

export default LSPAMTimeBlock