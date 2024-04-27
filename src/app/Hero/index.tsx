'use client';

import React, { useState } from 'react';
import Canvas from './Canvas';
import styles from './styles.module.scss';

const Hero = () => {
  const [breakCube, setBreakCube] = useState(false);
  return (
    <div className={styles.hero}>
      <Canvas breakCube={breakCube} />
      <button className={styles.button} onClick={() => setBreakCube(!breakCube)}>{breakCube ? 'Back to normal' : 'Break cube'}</button>
    </div>
  );
};

export default Hero;
