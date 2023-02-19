import "./MapMarker.css"
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {GiMushroomHouse} from "react-icons/gi"


const ListingMarker = ({ lat, lng, markerInfo }) => {
  const history = useHistory();
  const [condition, setCondition] = useState(false)

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/listings/${markerInfo.listing_id}`)
    window.scrollTo(0, 0)
  }

  

  return (
    <div className='Listing-Marker' onMouseOver={() => setCondition(true)} onMouseOut={() => setCondition(false)} onClick={handleClick}>
      {
        condition ?
          <div>
            <div className='Listing-Marker-Info'>
              {/* <img id="marker-listing-photo" src={listingPhoto ? listingPhoto : logo} alt="" />
              <p id="marker-listing-price">${info?.price.toLocaleString()}</p>
              <p>{info.bedroom} bd {info.bathroom} ba</p>
              <p>{info.listing_type} for {info.deal_type}</p> */}
            </div>
          </div> : null
      }

      <GiMushroomHouse />

    </div>
  )
}

export default ListingMarker