'use client';

import React, { useState } from 'react';
import Canvas from './Canvas';
import styles from './styles.module.scss';

const Hero = () => {
  const [breakCube, setBreakCube] = useState(false);
  return (
    <div className={styles.hero}>
      <Canvas breakCube={breakCube} />
      {/* <button className={styles.button} onClick={() => setBreakCube(!breakCube)}>{breakCube ? 'Back to normal' : 'Break cube'}</button> */}
      <div className={styles.ui}>
        <p>U - Up</p>
        <p>D - Down</p>
        <p>L - Left</p>
        <p>R - Right</p>
        <p>F - Front</p>
        <p>B - Back</p>
        <p>M - Middle</p>
      </div>
    </div>
  );
};

export default Hero;
