import React from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Canvas = () => {
  return (
    <R3FCanvas>
      {/* <Environment preset="dawn" /> */}
      <Cube />
      <OrbitControls />
    </R3FCanvas>
  );
};

export default Canvas;
