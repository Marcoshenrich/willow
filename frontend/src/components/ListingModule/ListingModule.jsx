import { Link } from "react-router-dom";
import "./ListingModule.css"
import house from "../assets/house1.jpeg"
import { FaHeart } from "react-icons/fa"
import { useState } from "react";

const ListingModule = ({listing}) => {
  const [favoriteActive, setFavoriteActive] = useState(false)

  const handleFavoriteClick = (e) => {
    setFavoriteActive((favoriteActive) =>  !favoriteActive )
  }

  const findAgentName = () => {
    
  }

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
        <div id="LM-Info-Agent">
          {listing && ("-> Fairy-Godmother Name and Link <-")}
        </div>
      </div>
    </div>
  )
}

export default ListingModule