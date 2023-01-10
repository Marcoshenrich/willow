import ListingShowPage from "../ListingShowPage"
import "./ListingsIndex.css"
import { Link } from "react-router-dom"
import Map from "../Map"
import ListingModule from "../ListingModule"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getListings, fetchListings } from "../../store/listings"
import { BsChevronDown } from "react-icons/bs"
import { fetchFavorites, getFavorites } from "../../store/favorite"
import { getCurrentUser } from "../../store/session"


const ListingsIndex = () => {

  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)
  const currentUser = useSelector(getCurrentUser)
  
  useEffect(()=>{
    dispatch(fetchListings())
    if (currentUser) dispatch(fetchFavorites(currentUser.id))
  },[])

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


  return (
    <>
    <div className="Listings-Index">
      <div className="Listings-Panels">
          <div id="Listings-Map">
            <Map/>
          </div>
          <div id="Listings-Nav">
            <div id="Listings-Header">
              <h2>Magical Homes Just For You</h2>
              <div>
                <div>Sort: Homes For You</div>
                <BsChevronDown id="LI-Sort-Dropdown-Icon" />
              </div>
            </div>
            <div id="Listings-Container">
              {listings && (listings.map((listing, i) => <ListingModule listing={listing} key={i} favoriteId={favoriteChecker(listing)}/> ) )}
            </div>
          </div>
      </div>
    </div> 
    </>
  )
}

export default ListingsIndex