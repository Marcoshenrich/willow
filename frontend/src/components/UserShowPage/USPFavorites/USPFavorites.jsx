import "./USPFavorites.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getListings } from "../../../store/listings";
import { getFavorites } from "../../../store/favorite";
import ListingModule from "../../ListingModule";
import Carousel from 'react-elastic-carousel';
import { Link } from "react-router-dom";
 


const USPFavorites = () => {
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)
  console.log(window.innerHeight)
  const [carouselPos, setcarouselPos] = useState(window.innerHeight >= 800 ? 0 : Math.abs(window.innerHeight - 800) / 2.5)
  const [showFavoriteQueue, setShowFavoriteQueue] = useState(false)

  useEffect(() => {
    setShowFavoriteQueue(!!favorites.length)
  }, [favorites])


  const placeListingModules = () => {
    if (listings.length > 0 && favorites) {
      return (
        favorites.map((favorite, i) => {
          return <ListingModule key={favorite.id} listing={listings[favorite.listingId - 1]} favoriteId={favorite.id}
          />})
      )
    }
  }

  window.addEventListener("resize", (e) => { 
    if (e.target.innerHeight >= 800) {
      setcarouselPos(0)
    } else {
      setcarouselPos(Math.abs(e.target.innerHeight - 800)/2.5)
    }
  });



  return (
      <div className="USP-Favorites">
      {showFavoriteQueue && (
        <div className={`USP-Favorited-Carousel`} style={{ top: carouselPos }}>
          <Carousel verticalMode itemsToShow={2} top={2000}>
              {placeListingModules()}
          </Carousel>
        </div>
        )} 

        {!showFavoriteQueue && (
          <div id="USP-Favorites-None-Body">
            <div>Uh oh, looks like you haven't found any homes you love yet</div>
            <Link Link to="/listings"><div>Find the perfect home</div></Link>
          </div>)}
      </div>
  )
}

export default USPFavorites