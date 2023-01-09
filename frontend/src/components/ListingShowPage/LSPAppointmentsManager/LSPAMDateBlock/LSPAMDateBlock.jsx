import "./LSPAMDateBlock.css"

const LSPAMDateBlock = ({ day, weekday, month, year, activeDate, setActiveDate}) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const dateBlockClickHandler = (e) => {
    e.stopPropagation()
    setActiveDate(new Date(year, month, day))
  }
  
  console.log(activeDate)

  return (
    <>
      <div id={activeDate.getDate() === day ? "LSPAMDB-Container-Active" : "LSPAMDB-Container" }      onClick={dateBlockClickHandler}>
        <div id="LSPAMDB-Weekday">{weekday}</div>
        <div id="LSPAMDB-Date">{day}</div>
        <div id="LSPAMDB-Month">{months[month]}</div>
      </div>
    </>
  )
}

export default LSPAMDateBlock