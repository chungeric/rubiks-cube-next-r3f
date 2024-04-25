'use client';

import React from 'react';
import Canvas from './Canvas';
import styles from './styles.module.scss';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Canvas />
    </div>
  );
};

export default Hero;
