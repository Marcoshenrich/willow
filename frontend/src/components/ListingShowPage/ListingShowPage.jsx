import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import "./ListingShowPage.css"

const ListingShowPage = () => {
  const dispatch = useDispatch()
  const {listingId} = useParams()
  const listing = useSelector(getListing(listingId))

  useEffect(()=>{
    dispatch(fetchListing(listingId))
  }, [listingId])

  return (
    <div className="Listing-Show-Page">
      <div className="Listing-Show-Page-Images">images</div>
      <div className="Listing-Show-Page-Topline">
        <div className="Listing-Show-Page-Core-Info">
          <div>
            <div id="Listing-Show-Page-Address">
              <span>{listing.streetNum} {listing.streetName},</span>
              <span>{listing.city}, {listing.state}, {listing.zip}</span>
            
            
            </div>
            <div id="Listing-Show-Page-Base-Stats">stats</div>
          </div>
          <div id="Listing-Show-Page-Mortgage-Info">Mortgage</div>
        </div>
          <div id="Listing-Show-Page-Appointment-Info">Appointment</div>
      </div>
      <div id="Listing-Show-Page-Local-Info">Local Info</div>
      <div id="Listing-Show-Page-Description">Description</div>
      <div id="Listing-Show-Page-Highlights">Highlights</div>
      <div id="Listing-Show-Page-Details">Details</div>
    </div>
  )
}

export default ListingShowPage