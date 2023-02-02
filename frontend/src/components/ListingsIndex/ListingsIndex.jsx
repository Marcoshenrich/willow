import "./ListingsIndex.css"
import { useParams } from "react-router-dom"
import Map from "../Map"
import ListingModule from "../ListingModule"
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { getSortedListings, fetchListings, searchListings, rerenderListings } from "../../store/listings"
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
  const currentUser = useSelector(getCurrentUser)
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [triggerSort, setTriggerSort] = useState(false)
  const [sortByLargestBool, setSortByLargestBool] = useState(true)
  const [sortBy, setSortBy] = useState("Homes For You")
  const [options, setOptions] = useState({
    sortByLargestBool,
    sortBy
  })
  const listings = useSelector(getSortedListings(options))

  
  useEffect(()=>{
    if (query) {
      dispatch(searchListings(query))
    } else {
      dispatch(fetchListings(options))
    }
    if (currentUser) dispatch(fetchFavorites(currentUser.id))
  }, [query])

  const onSessionModalClose = () => {
    setShowSessionModal(false)
    dispatch(clearErrors())
  }


  useEffect(()=>{
    setOptions({
      sortByLargestBool,
      sortBy
    }, dispatch(rerenderListings()))
    console.log(options)
  }, [sortByLargestBool, sortBy])


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