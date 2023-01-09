import "./LSPAMDateBlock.css"

const LSPAMDateBlock = ({ day, weekday, month, activeDate, setActiveDate}) => {


  const dateBlockClickHandler = (e) => {
    e.stopPropagation()
    setActiveDate(day)
  }

  return (
    <>
      <div id={activeDate === day ? "LSPAMDB-Container-Active" : "LSPAMDB-Container" }      onClick={dateBlockClickHandler}>
        <div id="LSPAMDB-Weekday">{weekday}</div>
        <div id="LSPAMDB-Date">{day}</div>
        <div id="LSPAMDB-Month">{month}</div>
      </div>
    </>
  )
}

export default LSPAMDateBlock