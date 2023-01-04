import ListingShowPage from "../ListingShowPage"
import "./ListingsIndex.css"
import { Link } from "react-router-dom"
import Map from "../Map"
import ListingModule from "../ListingModule"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getListings, fetchListings } from "../../store/listings"
import { BsChevronDown } from "react-icons/bs"


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
            <Map/>
          </div>
          <div id="Listings-Nav">
            <div id="Listings-Header">
              <h2>Magical Homes Just For You</h2>
              <div>Sort: Homes For You<BsChevronDown /></div>
            </div>
            <div id="Listings-Container">
              {listings && (listings.map((listing, i) => <ListingModule listing={listing} key={i}/> ) )}
            </div>
          </div>
      </div>
    </div> 
    </>
  )
}

export default ListingsIndex