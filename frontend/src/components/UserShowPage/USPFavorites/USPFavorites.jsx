import "./USPFavorites.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchAppointments, fetchAppointment, getAppointment, getAppointments, createAppointment, deleteAppointment } from "../../../store/appointment";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../../store/session";
import UserAppointmentShow from "../UserAppointmentShow";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { fetchListings, getListings } from "../../../store/listings";
import { fetchFavorites, getFavorites } from "../../../store/favorite";
import ListingModule from "../../ListingModule";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"



const USPFavorites = () => {


  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const favorites = useSelector(getFavorites)
  const currentUser = useSelector(getCurrentUser)
  const [favoriteQueue, setFavoriteQueue] = useState([])
  const [showFavoriteQueue, setShowFavoriteQueue] = useState(false)
  const [favoriteQueuePointer, setFavoriteQueuePointer] = useState(2)

  useEffect(() => {
    dispatch(fetchFavorites(currentUser.id))
    dispatch(fetchListings())
    setFavoriteQueue(favorites.slice(0, 3))
  }, [])

  useEffect(() => {
    setFavoriteQueue(favorites.slice(0, 3))
    if (favoriteQueue.length) {
      setShowFavoriteQueue(true)
    } else if (!favoriteQueue) {
      setShowFavoriteQueue(false)
    }
  }, [favorites])


  const placeListingModules = () => {
    if (listings.length > 0 && favorites && favoriteQueue) {
      return (
        favoriteQueue.map((favorite) =>
          <ListingModule listing={listings[favorite.listingId - 1]} favoriteId={favorite.id} />)
      )
    }
  }

  const negModuloHander = (pointer, queueLen) => {
    let remain = pointer % queueLen;
    let check = Math.floor(remain >= 0 ? remain : remain + queueLen)
    return check
  }

  const carouselClickHandler = (e) => {
    e.stopPropagation()
    let favoriteQueueclone = favoriteQueue.slice()
    if (e.currentTarget.id.slice(0, 4) === "Left") {
      favoriteQueueclone.pop()
      favoriteQueueclone.unshift(favorites[negModuloHander(favoriteQueuePointer - 3, favorites.length)])
      setFavoriteQueuePointer(favoriteQueuePointer - 1)
    } else {
      favoriteQueueclone.shift()
      favoriteQueueclone.push(favorites[negModuloHander(favoriteQueuePointer + 1, favorites.length)])
      setFavoriteQueuePointer(favoriteQueuePointer + 1)
    }
    setFavoriteQueue(favoriteQueueclone)
  }


  return (
      <div className="USP-Favorites">
        <div id="USP-Favorites-Header">You loved...</div>
        {showFavoriteQueue && (
          <div className="USP-Favorited-Carousel">
            {favorites.length > 3 && (<div className="USP-Carousel-Button" id="Left-USP-Carousel-Button" onClick={(e) => carouselClickHandler(e)}><BsChevronLeft className="USP-Carousel-Button-Icon" /></div>)}
            {placeListingModules()}
            {favorites.length > 3 && (<div className="USP-Carousel-Button" id="Right-USP-Carousel-Button" onClick={(e) => carouselClickHandler(e)}><BsChevronRight className="USP-Carousel-Button-Icon" /></div>)}
          </div>
        )}
        {!showFavoriteQueue && (
          <div id="USP-Favorites-None-Body">
            <div>Uh oh, looks like you haven't found any homes you love yet</div>
            <div>Find the perfect home</div>
          </div>)}
      </div>
  )
}

export default USPFavorites