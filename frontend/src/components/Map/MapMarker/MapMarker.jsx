import "./MapMarker.css"
import React from 'react'
import { useState } from 'react';
import {GiFairy} from "react-icons/gi"
import { ScrollModal } from "../../../context/Modal";
import ListingShowPage from "../../ListingShowPage";

const ListingMarker = ({ lat, lng, listing }) => {
  const [showMapModule, setShowMapModule] = useState(false)
  const [showListingModal, setShowListingModal] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setShowMapModule(false)
    setShowListingModal(true)
  }

  const onListingModalClose = (e) => {
    e.stopPropagation()
    setShowListingModal(false)
  }

  

  return (
    <div className='Listing-Marker' onMouseOver={() => { if (!showListingModal) setShowMapModule(true)}} onMouseOut={() => setShowMapModule(false)} onClick={handleClick}>
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

      {listing && showListingModal && (
        <ScrollModal onModalClose={onListingModalClose}>
          <ListingShowPage listing={listing} />
        </ScrollModal>)}

    </div>
  )
}

{/* <img id="marker-listing-photo" src={listingPhoto ? listingPhoto : logo} alt="" />
<p id="marker-listing-price">${info?.price.toLocaleString()}</p>
<p>{info.bedroom} bd {info.bathroom} ba</p>
<p>{info.listing_type} for {info.deal_type}</p>  */}

export default ListingMarker