import ListingModule from "../../ListingModule"
import "./LIListingContainer.css"

const LIListingContainer = ({ listings, setShowSessionModal }) => {

  return (
    <div id="Listings-Container">
      {listings && (listings.map((listing, i) => <ListingModule listing={listing} key={i} setShowSessionModal={setShowSessionModal} />))}
    </div>
  )
}

export default LIListingContainer