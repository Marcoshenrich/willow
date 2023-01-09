import "./LSPAppointmentsTimeContainer.css"
import { useDispatch, useSelector } from "react-redux"
import LSPAMTimeBlock from "../LSPAMTimeBlock"

const LSPAppointmentsTimeContainer = () => {
  const dispatch = useDispatch()

  const now = new Date()
  const timeStr = now.toISOString().slice(10)
  const today = now.toISOString().slice(0, 10)


  const timeBlockMaker = () => {
 

  }


  return (
    <div id="LSPA-Time-Container">
      <LSPAMTimeBlock/>
      <LSPAMTimeBlock />
      <LSPAMTimeBlock />
      <LSPAMTimeBlock />
    </div>
  )
}

export default LSPAppointmentsTimeContainer