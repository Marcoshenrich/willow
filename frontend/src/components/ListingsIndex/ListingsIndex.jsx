import "./ListingsIndex.css"
import { useParams } from "react-router-dom"
import Map from "../Map"
import ListingModule from "../ListingModule"
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { getListings, fetchListings, searchListings } from "../../store/listings"
import { fetchFavorites, getFavorites } from "../../store/favorite"
import { clearErrors } from "../../store/errors"
import { getCurrentUser } from "../../store/session"
import SessionModal from '../SessionModal';
import { FixedModal } from '../../context/Modal';
import LISort from "./LISort"
import LIListingContainer from "./LIListingContainer"


const ListingsIndex = () => {
  const { query } = useParams()
  const dispatch = useDispatch()
  const listingsArr = useSelector(getListings)
  const currentUser = useSelector(getCurrentUser)
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [triggerSort, setTriggerSort] = useState(false)
  const [sortByLargestBool, setSortByLargestBool] = useState(false)
  const [sortBy, setSortBy] = useState("Homes For You")
  const [listings, setListings] = useState(listingsArr)

  
  useEffect(()=>{
    if (query) {
      dispatch(searchListings(query))
    } else {
      dispatch(fetchListings())
    }
    if (currentUser) dispatch(fetchFavorites(currentUser.id))
  }, [query])

  const onSessionModalClose = () => {
    setShowSessionModal(false)
    dispatch(clearErrors())
  }

  useEffect(()=>{
    setListings(listingsArr)
  },[])



  useEffect(()=>{
    setListings(sortListingsBy(listings))
  }, [sortByLargestBool, sortBy])



  const sortListingsBy = (prevListings) =>{
    var sortKey;

    if (sortBy === "Price") {
      if (sortByLargestBool) {
        return prevListings.sort((b, a) => (a.humanTeeth + a.stolenDreams + a.fairyDust) - (b.humanTeeth + b.stolenDreams + b.fairyDust))
      } else {
        return prevListings.sort((a, b) => (a.humanTeeth + a.stolenDreams + a.fairyDust) - (b.humanTeeth + b.stolenDreams + b.fairyDust))
      }

    } else if (sortBy === "Square Inches") {
      sortKey = "sqin";
    } else if (sortBy === "Number of Rooms") {
      sortKey = "numRooms";
    } else if (sortBy === "Number of Beds") {
      sortKey = "beds"
    } else if (sortBy === "Number of Hearths") {
      sortKey = "numFireplaces";
    } else {
      if (sortByLargestBool) {
        return prevListings.sort((b, a) => a.id - b.id)
      } else {
        return prevListings.sort((a, b) => a.id - b.id)
      }
    }


    if (sortByLargestBool) {
      return prevListings.sort((a, b) => a[sortKey] - b[sortKey])
    } else {
      return prevListings.sort((b, a) => a[sortKey] - b[sortKey])
    }
  }




  const sortTest = (e) =>{
    e.stopPropagation();
    setTriggerSort((triggerSort)=>!triggerSort);
  }

  useEffect(()=>{
    if (triggerSort) {
      listings.sort((a, b) => a.id - b.id);
    } else {
      listings.sort((b, a) => a.id - b.id);
    }
  }, [triggerSort])
  
  return (
    <>
    <div className="Listings-Index">
      <div className="Listings-Panels">
          <div id="Listings-Map">
            <Map/>
          </div>
          <div id="Listings-Nav">
            <div id="Listings-Header">
              <h2 onClick={e=>sortTest(e)}>Magical Homes Just For You</h2>
              <LISort sortByLargestBool={sortByLargestBool} setSortByLargestBool={setSortByLargestBool} sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <LIListingContainer listings={listings} setShowSessionModal={setShowSessionModal}/>
          </div>
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