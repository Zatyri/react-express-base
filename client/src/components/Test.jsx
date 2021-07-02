// This is a component for testing access to express
import React, {useState, useEffect} from 'react'

import logger from '../middleware/logger';

const Test = () => {
  const [test, setTest] = useState('No connection');

  useEffect(() => {
    fetchData();    
    logger('Data fetched from backend')
  },[]);

  const fetchData = async() => {
    const res = await fetch('http://localhost:5000/api/test', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    });
    const body = await res.json();
    if(res.status !== 200) {
      setTest(`Error accessing backend ${body.message}`)
       throw Error(body.message);
    }
    setTest(body.text);
  }

  return (
    <>
      <p>{test}</p>
    </>
  )
}

export default Test
