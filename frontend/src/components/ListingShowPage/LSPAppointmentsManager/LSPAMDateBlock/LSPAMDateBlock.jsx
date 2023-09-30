import "./LSPAMDateBlock.css"

const LSPAMDateBlock = ({ day, weekday, month, year, activeDate, setActiveDate}) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const dateBlockClickHandler = (e) => {
    e.stopPropagation()
    console.log(activeDate)
    // console.log(activeDate.getDate())
    console.log(day)
    setActiveDate(new Date(year, month, day))
  }
  
  return (
    <>
      <div id={activeDate && activeDate.getDate() === day ? "LSPAMDB-Container-Active" : "LSPAMDB-Container" }      onClick={dateBlockClickHandler}>
        <div id="LSPAMDB-Weekday">{weekday}</div>
        <div id="LSPAMDB-Date">{day}</div>
        <div id="LSPAMDB-Month">{months[month]}</div>
      </div>
    </>
  )
}

export default LSPAMDateBlock