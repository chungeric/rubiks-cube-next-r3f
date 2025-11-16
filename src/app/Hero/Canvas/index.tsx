import React from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Canvas = ({ breakCube }: { breakCube: boolean }) => {
  return (
    <R3FCanvas camera={{ fov: 20, position: [15, 15, 15] }}>
      {/* <Environment preset="dawn" /> */}
      <Cube breakCube={breakCube} />
      <OrbitControls enableDamping={true} dampingFactor={0.08} enablePan={false} minDistance={16} maxDistance={30} />
    </R3FCanvas>
  );
};

export default Canvas;
