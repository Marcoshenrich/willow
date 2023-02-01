import { Link } from "react-router-dom";
import "./ListingModule.css"
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { fetchUser, getUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux"
import { ScrollModal } from '../../context/Modal';
import ListingShowPage from "../ListingShowPage";
import { createFavorite, deleteFavorite, fetchFavorites, getFavorites } from "../../store/favorite";
import { getCurrentUser } from "../../store/session"

const ListingModule = ({ listing, favoriteId, setShowSessionModal }) => {
  const dispatch = useDispatch()
  const agentId = listing.agentId
  const agent = useSelector(getUser(agentId))
  const current_user = useSelector(getCurrentUser)
  
  const [showListingModal, setShowListingModal] = useState(false)
  const [favoriteActive, setFavoriteActive] = useState(!!favoriteId)

  const onListingModalClose = (e) => {
    e.stopPropagation()
    setShowListingModal(false)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (!current_user) { 
      setShowSessionModal(true)
    } else if (favoriteActive) {
      dispatch(deleteFavorite(favoriteId))
    } else {
      const favorite = {
        listingId: listing.id,
        userId: current_user.id
      }
      dispatch(createFavorite(favorite))
    }
    if (current_user) setFavoriteActive((favoriteActive) => !favoriteActive)

  }

  
  useEffect(() => {
    dispatch(fetchUser(agentId))
    setFavoriteActive(!!favoriteId)
  }, [])

  return (
    <div id="Listing-Module" onClick={() => setShowListingModal(true)}>
      <FaHeart 
        style={{ stroke: "white", strokeWidth: "45", overflowClipMargin: "border-box", paddingLeft: "3px", paddingRight: "3px" }} 
        className={favoriteActive ? "LM-Favorite LM-Favorite-Active" : "LM-Favorite" } 
        onClick={handleFavoriteClick}/>
      <div id="LM-Image">
        <img src={listing && listing.imageUrls && (listing.imageUrls[0])} />
      </div>

      {listing && showListingModal && (
        <ScrollModal onModalClose={onListingModalClose}>
          <ListingShowPage listing={listing} />
        </ScrollModal>)}

      <div id="LM-Info-Container">
        <div id="LM-Info-Value">
          {listing && (`${listing.name}` + " - $" + (listing.humanTeeth + listing.fairyDust + listing.stolenDreams))}
        </div>
        <div id="LM-Info-Details">
          {listing && (`${listing.beds} bds | ${listing.sqin} sqin - built ${listing.built}`)}
        </div>
        {agent && (
          <div><Link id="LM-Info-Agent-Link" to={`/agents/${agent.id}`}>
          <div id="LM-Info-Agent">
            {`Godmother: ${ agent.username}`}
          </div>
          </Link></div>
        )}
      </div>
    </div>
  )
}

export default ListingModule