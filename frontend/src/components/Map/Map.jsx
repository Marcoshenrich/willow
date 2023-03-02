import React, { useEffect, useMemo } from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapKey, getMapKey } from '../../store/map';
import { getListings } from "../../store/listings"
import './Map.css';
import { useState } from 'react';
import MapMarker from './MapMarker';
import { getAppointments } from '../../store/appointment';
import { getFavorites } from '../../store/favorite';

const Map = ({iconDisplay}) => {

  const listings = useSelector(getListings)
  const appointments = useSelector(getAppointments)
  const favorites = useSelector(getFavorites)

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

  const markers = () => {
    if (iconDisplay) {
      return listings?.map((listing, idx) => {
        return <MapMarker lat={listing.lat} lng={listing.long} key={idx} listing={listing} icon={iconDisplay} />
      })
    } else {
      return listings?.map((listing, idx) => {
        return <MapMarker lat={listing.lat} lng={listing.long} key={idx} listing={listing} icon={"Appointments"} />
      })
    }
  }
  

  //problem here is that this has listing Id's, not indicies for the array. 
  // consider using the use selector, or writing a bulky algo to check each listing id
  const iconSorter = () => {
    let listingIdsAppointments = [] 
    let listingIdsFavorites = [] 

    for (let appointment of appointments) {
      listingIdsAppointments.push(appointment.listingId)
    }

    for (let favorite of favorites) {
      if (listingIdsAppointments.includes(favorite.listingId)) continue
      listingIdsFavorites.push(favorite.listingId)
    }

    return [listingIdsAppointments, listingIdsFavorites]
  }

  
  


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
        draggable={true}
        yesIWantToUseGoogleMapApiInternals
      >
        {listings.length > 0 && (markers())}
      </GoogleMapReact>
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