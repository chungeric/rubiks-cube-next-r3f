'use client';

import React, { useState } from 'react';
import Canvas from './Canvas';
import styles from './styles.module.scss';

const Hero = () => {
  const [breakCube, setBreakCube] = useState(false);
  return (
    <div className={styles.hero}>
      <Canvas breakCube={breakCube} />
      <button className={styles.button} onClick={() => setBreakCube(!breakCube)}>
        {breakCube ? 'Back to normal' : 'Break cube'}
      </button>
      <div className={styles.ui}>
        <p>
          <span>Left click and drag anywhere</span> to inspect the cube
        </p>
        <p>
          <span>Left click</span> a sticker to rotate clockwise
        </p>
        <p>
          <span>Right click</span> a sticker to rotate counterclockwise
        </p>
        <p>
          <span>U</span> - Up
        </p>
        <p>
          <span>D</span> - Down
        </p>
        <p>
          <span>L</span> - Left
        </p>
        <p>
          <span>R</span> - Right
        </p>
        <p>
          <span>F</span> - Front
        </p>
        <p>
          <span>B</span> - Back
        </p>
        <p>
          <span>M</span> - Middle
        </p>
        <p>
          <span>Hold Shift</span> and press any valid key to rotate counterclockwise
        </p>
      </div>
    </div>
  );
};

export default Hero;
