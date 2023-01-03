import React, { useEffect, useMemo } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Map.css';
import { fetchMapKey, getMapKey } from '../../store/map';
import {GiButterflyFlower} from "react-icons/gi"




const MapWrapper = () => {

  return (
    <>
      <Wrapper>
        <LocalMap />
      </Wrapper>
    </>
  )
}

export const LocalMap = () => {
  const dispatch = useDispatch()
  const key = useSelector(getMapKey)

  useEffect(() => {
    dispatch(fetchMapKey())
  }, [dispatch])

  const { isLoaded } = useLoadScript({ googleMapsApiKey: key })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div><Map/></div>
  )
}

const Map = () => {
  const center = useMemo(() => ({ lat: 35, lng: -111 }))

  const tourStops = [
    [{ lat: 34.8791806, lng: -111.8265049 }, "Boynton Pass"],
    [{ lat: 34.8559195, lng: -111.7988186 }, "Airport Mesa"],
    [{ lat: 34.832149, lng: -111.7695277 }, "Chapel of the Holy Cross"],
    [{ lat: 34.823736, lng: -111.8001857 }, "Red Rock Crossing"],
    [{ lat: 34.800326, lng: -111.7665047 }, "Bell Rock"],
  ];

  const markers = document.getElementById("Marker")
  console.log(markers)


  return <GoogleMap zoom={10} center={center} mapContainerClassName="map">
    {tourStops.map(([coords, title], i) => 
      <Marker id="Marker" position={coords} title={`${i + 1}. ${title}`} optimized={false} label={`${i + 1}`} />
    )}
  </GoogleMap >
}

export default MapWrapper