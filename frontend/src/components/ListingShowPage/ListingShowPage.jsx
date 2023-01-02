import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchListing, getListing } from "../../store/listings"
import "./ListingShowPage.css"
import ListingShowPageCoreInfo from "./ListingShowPageCoreInfo/ListingShowPageCoreInfo"

const ListingShowPage = () => {
  const dispatch = useDispatch()
  const {listingId} = useParams()
  const listing = useSelector(getListing(listingId))
  
  useEffect(()=>{
    dispatch(fetchListing(listingId))
  }, [listingId])


  return (
    <div className="LSP">
      <div className="LSP-Images">images</div>
      <ListingShowPageCoreInfo listing={listing}/>
      <div id="LSP-Local-Info">Local Info</div>
      <div id="LSP-Description">
        <h2>Description</h2>
        {listing && (<p>{listing.description}</p>)}
      </div>
      <div id="LSP-Highlights">Highlights</div>
      <div id="LSP-Details">Details</div>
    </div>
  )
}

export default ListingShowPage