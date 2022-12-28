import React, { useEffect, useMemo } from 'react'
import { Wrapper} from "@googlemaps/react-wrapper";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './BenchMap.css';



const BenchMapWrapper = ({ key }) => {
  return (
    <>
      <div className='test2'>BenchMapWrapper</div>
      <div className='test'>BenchMapWrapper</div>
      <Wrapper>
        <BenchMap key={key} />
      </Wrapper>
    </>
  )
}

export const BenchMap = ({ key }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: key })

  if (!isLoaded) return <div>Loading...</div>
  
  return (
    <div><Map/></div>
  )
}

const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -88 }))

  return <GoogleMap zoom={10} center={center} mapContainerClassName="map">
    <Marker position={{ lat: 45, lng: -88 }} />
    <Marker position={{ lat: 44, lng: -88 }} />
    <Marker position={{ lat: 44, lng: -87 }} />
  </GoogleMap >
}

export default BenchMapWrapper

