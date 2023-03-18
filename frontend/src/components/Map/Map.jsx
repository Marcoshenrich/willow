import React, { useEffect, useMemo } from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapKey, getMapKey } from '../../store/map';
import { getListings, getIconListings } from "../../store/listings"
import './Map.css';
import { useState } from 'react';
import MapMarker from './MapMarker';
import { getAppointments } from '../../store/appointment';
import { getFavorites } from '../../store/favorite';
import { getCurrentUser } from '../../store/session';

const Map = ({iconDisplay, listings}) => {

  const appointments = useSelector(getAppointments)
  const favorites = useSelector(getFavorites)

  const currentUser = useSelector(getCurrentUser)

  const defaultProps = {
    center: {
      lat: 37.7749, 
      lng: -122.36
    },
    zoom: 12
  };

  const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true
  }

  const iconSorter = () => {
    let listingIdsAppointments = []
    let listingIdsFavorites = []

    if (iconDisplay !== "Favorites") {
      for (let appointment of appointments) {
        if (appointment.userId !== currentUser.id) continue
        listingIdsAppointments.push(appointment.listingId)
      }
    }

    for (let favorite of favorites) {
      if (listingIdsAppointments.includes(favorite.listingId)) continue
      listingIdsFavorites.push(favorite.listingId)
    }

    return [listingIdsAppointments, listingIdsFavorites]
  }

  const markers = () => {
    let iconArrs = iconSorter()
    return listings?.map((listing, idx) => {
      return <MapMarker lat={listing.lat} lng={listing.long} key={idx} listing={listing} iconArrs={iconArrs}/>
    })
  }
  

  


  return (

    <div style={{ height: '100%', width: '100%' }}>
      {listings && (
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
        draggable={true}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers()}
      </GoogleMapReact>
      )}
      </div>

  );
}

export default Map;
























// const MapWrapper = () => {
//   const dispatch = useDispatch()
//   const key = useSelector(getMapKey)
//   const listings = useSelector(getListings)

//   useEffect(() => {
//     dispatch(fetchMapKey())
//   }, [])
  

//   return (
//     <>
//       <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
//         <LocalMap listings={listings}/>
//       </Wrapper>
//     </>
//   )
// }


// export const LocalMap = ({ listings }) => {
//   const center = useMemo(() => ({ lat: 37.7749, lng: -122.36 }))

//   const listingCoords = () => {
//     const coordsArr = []
//     for (let i = 0; i < listings.length; i++) {
//         coordsArr.push({ lat: listings[i].lat, lng: listings[i].long })
//     }
//     return coordsArr
//   }

//   return (
//    <GoogleMap zoom={12} center={center} mapContainerClassName="map">
//       {listings && (listingCoords().map((coords, i) =>
//       <Marker id="Marker" key={i} position={coords} optimized={false} />
//     ))}
//   </GoogleMap >
//   )
// }


// export default MapWrapper