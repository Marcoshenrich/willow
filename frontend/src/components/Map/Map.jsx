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
  console.log(process.env.REACT_APP_MAPS_API_KEY)
  

  return (
    <>
      <Wrapper>
        <LocalMap listings={listings}/>
      </Wrapper>
    </>
  )
}

export const LocalMap = () => {

  const center = useMemo(() => ({ lat: 37.7749, lng: -122.36 }))

  const markers = document.getElementById("Marker")

  return (
   <GoogleMap zoom={12} center={center} mapContainerClassName="map">
    {/* {tourStops.map(([coords, title], i) =>
      <Marker id="Marker" key={i} position={coords} title={`${i + 1}. ${title}`} optimized={false} label={`${i + 1}`} />
    )} */}
  </GoogleMap >
  )
}


export default MapWrapper