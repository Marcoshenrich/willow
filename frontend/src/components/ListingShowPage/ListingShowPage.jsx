import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import "./ListingShowPage.css"
import { TbBed } from "react-icons/tb"

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
        <div className="Listing-Show-Page-Core-Info">
          <div>
            <div className="Listing-Show-Page-Address">
            {listing && (<span id="Listing-Show-Page-Core-Info-h2">{listing.streetNum} {listing.streetName}</span>)}
            {listing && (<span id="Listing-Show-Page-Core-Info-Body">{listing.city}, {listing.state}, {listing.zip}</span>)}
            </div>
            <div id="Listing-Show-Page-Base-Stats">
            <TbBed className="Listing-Show-Page-Icon"/>
              <div>3 beds</div>
            <TbBed className="Listing-Show-Page-Icon" />
              <div>2 Baths</div>
            <TbBed className="Listing-Show-Page-Icon" />
              <div>1,300 sqft</div>
            </div>
          </div>
          <div className="Listing-Show-Page-Mortgage-Info">
            {listing && (<span id="Listing-Show-Page-Core-Info-h2">{"$" + listing.value} </span>)}
            {listing && (<span id="Listing-Show-Page-Core-Info-Body">{"Est. Mortgage $" + Math.floor(listing.value/24) + "/mo*"} </span>)}
          {listing && (<span id="Listing-Show-Page-Core-Info-Body">{"40 human teeth deposit"} </span>)}
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