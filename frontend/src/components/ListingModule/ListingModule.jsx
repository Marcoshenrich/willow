import { Link } from "react-router-dom";
import "./ListingModule.css"
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { fetchUser, getUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux"
import { ScrollModal } from '../../context/Modal';
import ListingShowPage from "../ListingShowPage";


const ListingModule = ({listing}) => {
  const dispatch = useDispatch()
  const [showListingModal, setShowListingModal] = useState(false)
  const [dummyState, SetDummyState] = useState(true)

  const onListingModalClose = (e) => {
    e.stopPropagation()
    console.log("in listing-modal close")
    console.log(showListingModal)
    setShowListingModal(false)
    console.log(showListingModal)

    console.log(dummyState)
    SetDummyState(true)
  }

  const listingModalOpen = () => {
    
    setShowListingModal(true)
  }


  const [favoriteActive, setFavoriteActive] = useState(false)
  const agentId = listing.agentId
  const agent = useSelector(getUser(agentId))

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setFavoriteActive((favoriteActive) =>  !favoriteActive )
  }
  
  useEffect(() => {
    dispatch(fetchUser(agentId))
    
  }, [])




  return (
    <div id="Listing-Module" onClick={()=>listingModalOpen()}>
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