import React, { useEffect, useMemo } from 'react'
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapKey, getMapKey } from '../../store/map';
import { getListings } from "../../store/listings"
import './Map.css';
import { useState } from 'react';
import MapMarker from './MapMarker';




const AnyReactComponent = ({ text }) => <div id="map-pin">{text}</div>;

const Map = ({ setLat, setLng, lat, lng }) => {
  const listings = useSelector(getListings)

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

  const getCoordinates = (e) => {
    setLat(e.lat);
    setLng(e.lng)
  }

  const markers = listings?.map((listing, idx) => {
    console.log("in markers")
    return <MapMarker lat={listing.lat} lng={listing.long} key={idx} listing={listing}/>
  })


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact onClick={getCoordinates}
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
        draggable={true}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers}
        <AnyReactComponent latitude={lat} setLongitude={lng}
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
        />
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