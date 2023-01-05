import "./AgentShowPage.css"

const AgentShowPage = () => {
  const today = new Date();

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
    </>
  )
}

export default AgentShowPage