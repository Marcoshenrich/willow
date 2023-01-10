import "./LSPDetails.css"

const LSPDetails = ({listing}) => {

  return (

    <>
      {listing && (<h2 id="LSP-Details-h2" >Home Details for {listing.streetNum} {listing.streetName}</h2>)}
      <div id="LSP-Details-Info">
        <div id="LSP-Details-Info-Header-Box">Interior Features</div>
        <div id="LSP-Details-Info-Header2">Size</div>
        <div id="LSP-Details-Info-Details">
          <ul>
            {listing && (<li>Square inches: {listing.sqin}"</li>)}
            {listing && (<li>Number of Rooms: {listing.numRooms}</li>)}
          </ul>
        </div>
        <div id="LSP-Details-Info-Header2">Cozy Spaces</div>
        <div id="LSP-Details-Info-Details">
          <ul>
            {listing && (<li>Beds: {listing.beds}</li>)}
            {listing && (<li>Fireplaces: {listing.numFireplaces}</li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default LSPDetails