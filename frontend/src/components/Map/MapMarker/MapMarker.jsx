import "./MapMarker.css"
import React from 'react'
import { useState } from 'react';
import {GiFairy} from "react-icons/gi"
import { GiFairyWand } from "react-icons/gi"
import { GiEvilHand } from "react-icons/gi"
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
            <div className="LMI-Listing-Name">{listing.name}</div>
            <div className="LMI-Listing-Price">${listing.humanTeeth + listing.fairyDust + listing.stolenDreams}</div>
            <div className="LMI-Highlight-Container">
              <div className="LMI-Highlight-Blurb" >
                <GiFairyWand className="LMI-Highlight-Icon" />
                <div className="LMI-Highlight-Text">{listing.blessings}</div>
              </div>
              <div className="LMI-Highlight-Blurb" >
                <GiEvilHand className="LMI-Highlight-Icon" />
                <div className="LMI-Highlight-Text">{listing.omens}</div>
              </div>

            </div>

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

export default ListingMarker