import React from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Canvas = ({ breakCube }: { breakCube: boolean; }) => {
  return (
    <R3FCanvas camera={{ fov: 20, position: [12, 12, 12] }}>
      {/* <Environment preset="dawn" /> */}
      <Cube breakCube={breakCube} />
      <OrbitControls />
    </R3FCanvas>
  );
};

export default Canvas;
