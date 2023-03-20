import "./LISort.css"
import { useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

const LISort = ({ sortByLargestBool, setSortByLargestBool, sortBy, setSortBy }) => {
  const [showDropown, setShowDropown] = useState(false)

  const sortDispatcher = (e) => {
    e.stopPropagation()
    setSortBy(e.target.innerText)
    setShowDropown(false)
  }

  const arrowClickHandler = (e) => {
    e.stopPropagation()
    setSortByLargestBool((sortByLargestBool)=>!sortByLargestBool)
  }


  return (
    <div>
      <div id="LI-Sort-Dropdown">
        <div id="LI-Sort-Dropdown-Header" onClick={(e) => { e.stopPropagation(); setShowDropown(!showDropown) }}>Sort: {sortBy}</div>
        {showDropown && (<div id="LI-Sort-Dropdown-Menu" >
          <div className="LI-Sort-Dropdown-Section" onClick={(e) => { sortDispatcher(e)}}>Homes for You</div>
          <div className="LI-Sort-Dropdown-Section" onClick={(e) => { sortDispatcher(e)}}>Price</div>
          <div className="LI-Sort-Dropdown-Section" onClick={(e) => { sortDispatcher(e)}}>Square Inches</div>
          <div className="LI-Sort-Dropdown-Section" onClick={(e) => { sortDispatcher(e)}}>Number of Rooms</div>
          <div className="LI-Sort-Dropdown-Section" onClick={(e) => { sortDispatcher(e)}}>Number of Beds</div>
          <div className="LI-Sort-Dropdown-Section" onClick={(e) => { sortDispatcher(e)}}>Number of Hearths</div>
        </div>)}
      </div>
      <div id="LI-Sort-Arrow" onClick={(e) => { arrowClickHandler(e)}}>
        {!sortByLargestBool && (<BsChevronDown id="LI-Sort-Dropdown-Icon" />)}
        {sortByLargestBool && (<BsChevronUp id="LI-Sort-Dropdown-Icon" />)}
      </div>
    </div>
  )
}

export default LISort