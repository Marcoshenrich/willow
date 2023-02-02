import "./LISort.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getListings, fetchListings, searchListings, sortListings } from "../../../store/listings"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { fetchFavorites, getFavorites } from "../../../store/favorite"
import { getCurrentUser } from "../../../store/session"

const LISort = ({ sortByLargestBool, setSortByLargestBool, sortBy, setSortBy }) => {
  const dispatch = useDispatch()
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

  useEffect(()=>{
    // dispatch(sortListings({ key: sortBy, sortByLargestBool }))
  }, [sortByLargestBool])

  useEffect(() => {
    // dispatch(sortListings({ key: "id", sortByLargestBool:true }))
  }, [])










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