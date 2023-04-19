import "./ListingsIndex.css"
import { useParams } from "react-router-dom"
import Map from "../Map"
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { getSortedListings, fetchListings, searchListings, rerenderListings } from "../../store/listings"
import { fetchFavorites } from "../../store/favorite"
import { clearErrors } from "../../store/errors"
import { getCurrentUser } from "../../store/session"
import SessionModal from '../SessionModal';
import { FixedModal } from '../../context/Modal';
import LISort from "./LISort"
import LIListingContainer from "./LIListingContainer"
import { fetchUserAppointments } from "../../store/appointment"


const ListingsIndex = () => {
  const { query } = useParams()
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [sortByLargestBool, setSortByLargestBool] = useState(false)
  const [sortBy, setSortBy] = useState("Homes For You")
  const [showListings, setShowListings] = useState(true)

  const [options, setOptions] = useState({
    sortByLargestBool,
    sortBy
  })
  const listings = useSelector(getSortedListings(options))
  let showListingsBool = true


  useEffect(()=>{
    if (query) {
      dispatch(searchListings(query))
    } else {
      dispatch(fetchListings(options))
    }
    if (currentUser) {
      dispatch(fetchFavorites(currentUser.id))
      dispatch(fetchUserAppointments(currentUser.id))
    }
  }, [query])

  const onSessionModalClose = () => {
    setShowSessionModal(false)
    dispatch(clearErrors())
  }

  const switchPanel = (e) => {
    e.preventDefault()
    setShowListings((showListingsBool) => !showListingsBool )
    console.log("in switch")
  }


  useEffect(()=>{
    setOptions({
      sortByLargestBool,
      sortBy
    }, dispatch(rerenderListings()))
  }, [sortByLargestBool, sortBy])
  
  return (
    <>
    <div className="Listings-Index">
      <div className="Listings-Panels">
          <div id="Listings-Map" className="Hide-Listing-Panel-Mobile">
            <Map listings={listings}/>
          </div>
          <div id="Listings-Nav" className="Hide-Listing-Panel-Mobile">
            <div id="Listings-Header">
              <h2>Magical Homes Just For You</h2>
              <LISort sortByLargestBool={sortByLargestBool} setSortByLargestBool={setSortByLargestBool} sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <LIListingContainer listings={listings} setShowSessionModal={setShowSessionModal}/>
          </div>
          {/* <div id="Mobile-Index-Switcher" onClick={switchPanel}></div> */}
      </div>
    </div>

      {showSessionModal && (
        <FixedModal onModalClose={onSessionModalClose}>
          <SessionModal onModalClose={onSessionModalClose} />
        </FixedModal>
      )}
    </>
  )
}

export default ListingsIndex