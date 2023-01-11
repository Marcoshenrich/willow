import "./USPFavorites.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../store/session";
import 'react-calendar/dist/Calendar.css'
import { fetchListings, getListings } from "../../../store/listings";
import { fetchFavorites, getFavorites } from "../../../store/favorite";
import ListingModule from "../../ListingModule";
import Carousel from 'react-elastic-carousel';
import { Link } from "react-router-dom";
 


const USPFavorites = () => {
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)

  const currentUser = useSelector(getCurrentUser)
  const [showFavoriteQueue, setShowFavoriteQueue] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)
  

  useEffect(() => {
    dispatch(fetchFavorites(currentUser.id)).then(() => dispatch(fetchListings()))
  }, [])

  useEffect(() => {
    setShowFavoriteQueue(!!favorites.length)
    setFavoriteCount(() => favorites.length >= 3 ? 3 : favorites.length ) 
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
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 900, itemsToShow: 3, itemsToScroll: 3 },
  ];

  return (
      <div className="USP-Favorites">
        <div id="USP-Favorites-Header">You loved...</div>
      {showFavoriteQueue && !!favoriteCount && (
        <div className={`USP-Favorited-Carousel ` + `Favorite-Carousel-${favoriteCount}`}>
            <Carousel breakPoints={breakPoints}>
              {placeListingModules()}
            </Carousel>
        </div>
        )} 

        {!showFavoriteQueue && (
          <div id="USP-Favorites-None-Body">
            <div>Uh oh, looks like you haven't found any homes you love yet</div>
          <Link to="/listings"><div>Find the perfect home</div></Link>
          </div>)}
      </div>
  )
}


/* {showFavoriteQueue && (
          <div className="USP-Favorited-Carousel">
            {favorites.length > 3 && (<div className="USP-Carousel-Button" id="Left-USP-Carousel-Button" onClick={(e) => carouselClickHandler(e)}><BsChevronLeft className="USP-Carousel-Button-Icon" /></div>)}
            {placeListingModules()}
            {favorites.length > 3 && (<div className="USP-Carousel-Button" id="Right-USP-Carousel-Button" onClick={(e) => carouselClickHandler(e)}><BsChevronRight className="USP-Carousel-Button-Icon" /></div>)}
          </div>
        )} */

// class App extends Component {
//   state = {
//     items: [
//       { id: 1, title: 'item #1' },
//       { id: 2, title: 'item #2' },
//       { id: 3, title: 'item #3' },
//       { id: 4, title: 'item #4' },
//       { id: 5, title: 'item #5' }
//     ]
//   }

//   render() {
//     const { items } = this.state;
//     return (
//       <Carousel>
//         {items.map(item => <div key={item.id}>{item.title}</div>)}
//       </Carousel>
//     )
//   }
// }

export default USPFavorites