import "./ListingModule.css"

const ListingModule = ({listing}) => {

  return (
    <div id="Listing-Module">
      {listing.name}
    </div>
  )
}

export default ListingModule