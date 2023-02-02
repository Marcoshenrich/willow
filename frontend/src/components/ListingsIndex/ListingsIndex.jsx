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


const ListingsIndex = () => {
  const { query } = useParams()
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)
  const currentUser = useSelector(getCurrentUser)
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [triggerSort, setTriggerSort] = useState(false)

  
  useEffect(()=>{
    if (query) {
      dispatch(searchListings(query))
    } else {
      dispatch(fetchListings())
    }
    if (currentUser) dispatch(fetchFavorites(currentUser.id))
  }, [query])

  const favoritedListings = () => {
    const favoritedListingArray = []
    const favoritedIdArray = []
    favorites.forEach((favorite)=>{
      favoritedListingArray.push(favorite.listingId)
      favoritedIdArray.push(favorite.id)
    })
  
    return [favoritedIdArray, favoritedListingArray]
  } 

  const favoriteChecker = (listing) => {
    let favoritedIdArray;
    let favoritedListingArray;
    [favoritedIdArray, favoritedListingArray] = favoritedListings()
    if (favoritedListingArray.includes(listing.id)) return favoritedIdArray[favoritedListingArray.indexOf(listing.id)]
    return false
  }

  const onSessionModalClose = () => {
    setShowSessionModal(false)
    dispatch(clearErrors())
  }

  const sortTest = (e) =>{
    e.stopPropagation();
    setTriggerSort(!triggerSort);
  }

  useEffect(()=>{
    if (triggerSort) {
      listings.sort((a, b) => a.id - b.id);
    } else {
      listings.sort((b, a) => a.id - b.id);
    }
    console.log(listings)
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
              <LISort />
            </div>
            <div id="Listings-Container">
              {listings && (listings.map((listing, i) => <ListingModule listing={listing} key={i} favoriteId={favoriteChecker(listing)} setShowSessionModal={setShowSessionModal}/> ) )}
            </div>
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