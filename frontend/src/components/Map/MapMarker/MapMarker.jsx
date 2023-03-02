import "./MapMarker.css"
import React from 'react'
import { useState } from 'react';
import {GiFairy} from "react-icons/gi"
import { GiFairyWand } from "react-icons/gi"
import { GiEvilHand } from "react-icons/gi"
import { BsSuitHeartFill } from "react-icons/bs"
import { FaRegClock } from "react-icons/fa"
import { ScrollModal } from "../../../context/Modal";
import ListingShowPage from "../../ListingShowPage";

const ListingMarker = ({ listing, iconArrs }) => {
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

  const iconParser = (iconArrs) => {
    let [listingIdsAppointments, listingIdsFavorites] = iconArrs
    if (listingIdsAppointments.includes(listing.id)) return "Appointments"
    if (listingIdsFavorites.includes(listing.id)) return "Favorites"
    return true
  }

  const iconPicker = () => {
    switch (iconParser(iconArrs)) {
      case "Favorites":
        return (<BsSuitHeartFill className='Listing-Marker-Icon' />)

      case "Appointments":
        return (<FaRegClock className='Listing-Marker-Icon' />)

      default:
        return (<GiFairy className='Listing-Marker-Icon' />)
    }

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
      {iconPicker()}
      </div>

      {listing && showListingModal && (
        <ScrollModal onModalClose={onListingModalClose}>
          <ListingShowPage listing={listing} />
        </ScrollModal>)}

    </div>
  )
}

export default ListingMarker