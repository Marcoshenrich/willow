import React, { useEffect, useMemo } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMapKey, getMapKey } from '../../store/map';
import {GiButterflyFlower} from "react-icons/gi"
import { getListings, fetchListings } from "../../store/listings"
import './Map.css';



const MapWrapper = () => {
  const dispatch = useDispatch()
  const key = useSelector(getMapKey)
  const listings = useSelector(getListings)

  useEffect(() => {
    dispatch(fetchMapKey())
    dispatch(fetchListings())
  }, [])

  const { isLoaded } = useLoadScript({ googleMapsApiKey: key })
  // console.log(process.env.REACT_APP_MAPS_API_KEY)
  

  return (
    <>
      <Wrapper>
        <LocalMap listings={listings}/>
      </Wrapper>
    </>
  )
}


export const LocalMap = ({ listings }) => {
  const center = useMemo(() => ({ lat: 37.7749, lng: -122.36 }))

  const listingCoords = () => {
    const coordsArr = []
    for (let i = 0; i < listings.length; i++) {
        coordsArr.push({ lat: listings[i].lat, lng: listings[i].long })
    }
    return coordsArr
  }

  return (
   <GoogleMap zoom={12} center={center} mapContainerClassName="map">
      {listings && (listingCoords().map((coords, i) =>
      <Marker id="Marker" key={i} position={coords} optimized={false} />
    ))}
  </GoogleMap >
  )
}


export default MapWrapper