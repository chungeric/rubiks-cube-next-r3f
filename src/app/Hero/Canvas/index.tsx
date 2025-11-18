import React from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { ContactShadows, Float, OrbitControls } from '@react-three/drei';
import Cube from './Cube';

const Canvas = ({ breakCube }: { breakCube: boolean }) => {
  return (
    <R3FCanvas camera={{ fov: 20, position: [20, 20, 20] }}>
      <Float>
        <Cube breakCube={breakCube} />
      </Float>
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.15}
        scale={10}
        blur={2}
        far={10}
        resolution={256}
        color="#000000"
      />
      <OrbitControls enableDamping={true} dampingFactor={0.08} enablePan={false} minDistance={32} maxDistance={35} />
    </R3FCanvas>
  );
};

export default Canvas;
