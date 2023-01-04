import "./LSPCoreInfo.css"
import { TbBed } from "react-icons/tb"
import { FaTooth } from "react-icons/fa"
import { GiFairyWand } from "react-icons/gi"
import { GiDreamCatcher } from "react-icons/gi"
import { GiPollenDust } from "react-icons/gi"


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
            <div>
              {listing && (<div><GiFairyWand className="LSP-Icon" /><p id="LSP-Core-Info-h2">{"Total $" + (listing.fairyDust + listing.humanTeeth + listing.stolenDreams)} </p></div>)}
              {listing && (<div><GiPollenDust className="LSP-Icon-Value"  /><p>{listing.fairyDust + " fairy dust"} </p></div>)}
            {listing && (<div><FaTooth className="LSP-Icon-Value"  /><p>{listing.humanTeeth + " human teeth"} </p></div>)}
              {listing && (<div><GiDreamCatcher className="LSP-Icon-Value" /><p>{listing.stolenDreams + " stolen dreams"} </p></div>)}
            </div>
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