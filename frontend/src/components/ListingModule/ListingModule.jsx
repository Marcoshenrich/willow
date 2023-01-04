import { Link } from "react-router-dom";
import "./ListingModule.css"
import house from "../assets/house1.jpeg"
import { FaHeart } from "react-icons/fa"

const ListingModule = ({listing}) => {

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    console.log(e.currentTarget.classList)
    if (e.currentTarget.classList.includes("LM-Favorite-Active")) {
      e.currentTarget.classList.remove("LM-Favorite-Active")
    } else {
      e.currentTarget.classList.add("LM-Favorite-Active")
    }

  }


  return (
    <div id="Listing-Module">
        <FaHeart style={{ stroke: "white", strokeWidth: "45" }} className="LM-Favorite" onClick={handleFavoriteClick}/>
      <Link to={`/listings/${listing.id}`}><div id="LM-Image">
        <img src={house} />
      </div></Link>
      <div id="LM-Info-Container"></div>
    </div>
  )
}

export default ListingModule