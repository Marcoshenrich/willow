import "./LSPCoreInfo.css"
import { TbBed } from "react-icons/tb"

const ListingShowPageCoreInfo = ({listing}) => {

  return (
    <>
      <div className="LSP-Core-Info">
        <div className="LSP-Top-Details">
          <div>
            <div className="LSP-Address">
              {listing && (<p id="LSP-Core-Info-h2">{listing.streetNum} {listing.streetName}</p>)}
              {listing && (<p id="LSP-Core-Info-Body">{listing.city}, {listing.state}, {listing.zip}</p>)}
            </div>
            <div id="LSP-Base-Stats">
              <TbBed className="LSP-Icon" />
              <div>3 beds</div>
              <TbBed className="LSP-Icon" />
              <div>2 Baths</div>
              <TbBed className="LSP-Icon" />
              <div>1,300 sqft</div>
            </div>
          </div>
          <div className="LSP-Mortgage-Info">
            {listing && (<p id="LSP-Core-Info-h2">{"$" + listing.value} </p>)}
            {listing && (<p id="LSP-Core-Info-Body">{"Est. Mortgage $" + Math.floor(listing.value / 24) + "/mo*"} </p>)}
            {listing && (<p id="LSP-Core-Info-Body">{"40 human teeth deposit"} </p>)}
          </div>
        </div>
        <div className="LSP-Appointment-Info">
          <p>Request a tour as early as</p>
          <p id="LSP-Appointment-Time">Tomorrow at 2:30pm</p>
          <button id="LSP-Appointment-Submit">Schedule a Tour</button>
        </div>
      </div>
    </>
  )
}

export default ListingShowPageCoreInfo