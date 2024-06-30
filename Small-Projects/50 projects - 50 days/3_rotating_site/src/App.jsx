import React, { useState } from 'react'
import Main from './Main'
import Navigation from './Navigation';

export default function App() {
    const [rotation, setRotation] = useState('');
    const [rotated, setRotated] = useState(false);

    function rotationHandler(){
        if (rotation === "-17deg"){
            setRotation("0deg");
        }
        else{
            setRotation("-17deg");
        }
        setRotated(prev => !prev);
    }

  return (
    <div>
      <Main rotation={rotation} />
      {rotated && <Navigation />}
      <button onClick={rotationHandler} className='menuIcon'>{rotated ? 'X' : '|||'}</button>
    </div>
  )
}
