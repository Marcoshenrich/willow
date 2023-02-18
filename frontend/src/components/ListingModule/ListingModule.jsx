import "./ListingModule.css"
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { fetchUser, getUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux"
import { ScrollModal } from '../../context/Modal';
import ListingShowPage from "../ListingShowPage";
import { createFavorite, deleteFavorite, getFavorites } from "../../store/favorite";
import { getCurrentUser } from "../../store/session"

const ListingModule = ({ listing, setShowSessionModal }) => {
  const dispatch = useDispatch()
  const agentId = listing.agentId
  const agent = useSelector(getUser(agentId))
  const current_user = useSelector(getCurrentUser)
  const favorites = useSelector(getFavorites)
  
  const [showListingModal, setShowListingModal] = useState(false)
  const [favoriteActive, setFavoriteActive] = useState(false)
  const [favoriteId, setFavoriteId] = useState(null)
  

  const favoriteChecker = () => {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].listingId === listing.id) {
        setFavoriteId(favorites[i].id);
        setFavoriteActive(true);
        return;
      }
    }
    setFavoriteId(null);
    setFavoriteActive(false);
  }

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
    favoriteChecker()
  }, [favorites])


  
  useEffect(() => {
    dispatch(fetchUser(agentId))
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
          <div>
          <div id="LM-Info-Agent">
            {`Godmother: ${ agent.username}`}
          </div>
         </div>
        )}
      </div>
    </div>
  )
}

export default ListingModule