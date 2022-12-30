import "./ListingShowPage.css"

const ListingShowPage = () => {

  return (
    <div className="Listing-Show-Page">
      <div className="Listing-Show-Page-Images">images</div>
      <div className="Listing-Show-Page-Topline">
        <div className="Listing-Show-Page-Core-Info">
          <div>
            <div id="Listing-Show-Page-Address">address</div>
            <div id="Listing-Show-Page-Base-Stats">stats</div>
          </div>
          <div id="Listing-Show-Page-Mortgage-Info">Mortgage</div>
        </div>
          <div id="Listing-Show-Page-Appointment-Info">Appointment</div>
      </div>
    </div>
  )
}

export default ListingShowPage