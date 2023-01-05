import { Link } from "react-router-dom";
import "./ListingModule.css"
import house from "../assets/house1.jpeg"
import { FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import { fetchUser, getUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux"


const ListingModule = ({listing}) => {
  const dispatch = useDispatch()
  const [favoriteActive, setFavoriteActive] = useState(false)
  const agentId = listing.agentId
  const agent = useSelector(getUser(agentId))

  const handleFavoriteClick = (e) => {
    setFavoriteActive((favoriteActive) =>  !favoriteActive )
  }
  
  useEffect(() => {
    dispatch(fetchUser(agentId))
    
  }, [])

  return (
    <div id="Listing-Module">
      <FaHeart 
      style={{ stroke: "white", strokeWidth: "45" }} 
      className={favoriteActive ? "LM-Favorite LM-Favorite-Active" : "LM-Favorite" } 
      onClick={handleFavoriteClick}/>
      <Link to={`/listings/${listing.id}`}><div id="LM-Image">
        <img src={listing && listing.imageUrls && (listing.imageUrls[0])} />
        {/* <img src={house} /> */}
      </div></Link>
      <div id="LM-Info-Container">
        <div id="LM-Info-Value">
          {listing && (`${listing.name}` + " - $" + (listing.humanTeeth + listing.fairyDust + listing.stolenDreams))}
        </div>
        <div id="LM-Info-Details">
          {listing && (`${listing.beds} bds | ${listing.sqin} sqin - built ${listing.built}`)}
        </div>
        {agent && (
        <Link to={`/users/${agent.id}`}>
        
          <div id="LM-Info-Agent">
            {`Godmother: ${ agent.username}`}
          </div>
        </Link>
        )}
      </div>
    </div>
  )
}

export default ListingModule