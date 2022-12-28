import './BenchIndex.css';
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenches, getBenches } from '../../store/benches';
import BenchMapWrapper from '../BenchMap';
import { fetchMapKey, getMapKey } from '../../store/map';

const BenchIndex = () => {
    const dispatch = useDispatch()
    const benches = useSelector(getBenches)
    const mapKey = useSelector(getMapKey)
    
    useEffect(()=>{
      dispatch(fetchBenches())
      dispatch(fetchMapKey())
    }, []) 

  return (
    <>
    <div>Bench Index</div>
          <div>{benches.map((bench)=>
          { return (
          <>
          <p>{bench.title}</p>
          <ul>
            <li>{bench.description}</li>
              <li>Sits: {bench.seating}</li>
          </ul>
          </>
          ) }
          )}</div> 
      <BenchMapWrapper key={mapKey.key}/>
    </>
  )
}

export default BenchIndex
