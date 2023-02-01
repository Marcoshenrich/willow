import ListingShowPage from "../ListingShowPage"
import "./ListingsIndex.css"
import { Link, useParams } from "react-router-dom"
import Map from "../Map"
import ListingModule from "../ListingModule"
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { getListings, fetchListings, searchListings, sortListings } from "../../store/listings"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { fetchFavorites, getFavorites } from "../../store/favorite"
import { getCurrentUser } from "../../store/session"
import LISort from "./LISort"


const ListingsIndex = () => {
  const { query } = useParams()
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)
  const currentUser = useSelector(getCurrentUser)

  
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
              <LISort />
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