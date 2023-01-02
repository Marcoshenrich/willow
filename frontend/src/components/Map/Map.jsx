import React, { useEffect, useMemo } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Map.css';
import { fetchMapKey, getMapKey } from '../../store/map';




const MapWrapper = () => {
  const dispatch = useDispatch()
  const key = useSelector(getMapKey)

  useEffect(()=>{
    dispatch(fetchMapKey())
  }, [dispatch])


  return (
    <>
      <Wrapper>
        <LocalMap key={key} />
      </Wrapper>
    </>
  )
}

export const LocalMap = ({ key }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: key })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div><Map key={ key } /></div>
  )
}

const Map = ({ key }) => {
  const center = useMemo(() => ({ lat: 44, lng: -88 }))

  return <GoogleMap zoom={10} center={center} mapContainerClassName="map">
    <Marker position={{ lat: 45, lng: -88 }} />
    <Marker position={{ lat: 44, lng: -88 }} />
    <Marker position={{ lat: 44, lng: -87 }} />
  </GoogleMap >
}

export default MapWrapper