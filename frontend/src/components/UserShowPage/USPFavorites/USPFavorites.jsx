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

  const [showFavoriteQueue, setShowFavoriteQueue] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    setShowFavoriteQueue(!!favorites.length)
    setFavoriteCount(() => favorites.length >= 2 ? 2 : favorites.length ) 
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

  const breakPoints = [
    { height: 1, itemsToShow: 1 },
    { height: 550, itemsToShow: 2, itemsToScroll: 2 }
  ];

  //breakPoints={breakPoints}

  return (
      <div className="USP-Favorites">
      {showFavoriteQueue && !!favoriteCount && (
        <div className={`USP-Favorited-Carousel ` + `Favorite-Carousel-${favoriteCount}`}>
          <Carousel verticalMode itemsToShow={2} height={1}>
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