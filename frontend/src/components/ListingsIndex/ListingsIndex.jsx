import ListingShowPage from "../ListingShowPage"
import "./ListingsIndex.css"
import { Link } from "react-router-dom"
import Map from "../Map"
import ListingModule from "../ListingModule"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getListings, fetchListings } from "../../store/listings"


const ListingsIndex = () => {

  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  
  useEffect(()=>{
    dispatch(fetchListings())
  },[])

  console.log(listings)

  return (
    <>
    <div className="Listings-Index">
        <div id="Listings-Search-Bar">Listings Search Bar</div>
      <div className="Listings-Panels">
          <div id="Listings-Map">
            {/* <Map/> */}
          </div>
          <div className="Listings-Nav">
            <div id="Listings-Header">Listings Header</div>
            <div id="Listings-Container">Listings Container
              {listings && (listings.map((listing, i) => <ListingModule listing={listing}/> ) )}
            </div>
          </div>
      </div>
    </div> 
    </>
  )
}

export default ListingsIndex