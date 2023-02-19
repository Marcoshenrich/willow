import "./MapMarker.css"
import React from 'react'
import { useState } from 'react';
import {GiFairy} from "react-icons/gi"


const ListingMarker = ({ lat, lng, listing }) => {
  const [showMapModule, setShowMapModule] = useState(false)

  const handleClick = (e) => {

  }

  

  return (
    <div className='Listing-Marker' onMouseOver={() => setShowMapModule(true)} onMouseOut={() => setShowMapModule(false)} onClick={handleClick}>
      {
        showMapModule ?
            <div className='Listing-Marker-Info'>
              <div id="Listing-Marker-Img-Container">
                <img id="Listing-Marker-Img" src={listing.imageUrls[0]}/>
              </div>
              <div>{listing.name}</div>
            </div> : null
      }
      <div className="Listing-Marker-Icon-Container" >
      <GiFairy className='Listing-Marker-Icon' />
      </div>

    </div>
  )
}

{/* <img id="marker-listing-photo" src={listingPhoto ? listingPhoto : logo} alt="" />
<p id="marker-listing-price">${info?.price.toLocaleString()}</p>
<p>{info.bedroom} bd {info.bathroom} ba</p>
<p>{info.listing_type} for {info.deal_type}</p>  */}

export default ListingMarker