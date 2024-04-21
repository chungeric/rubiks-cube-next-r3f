'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import styles from './styles.module.scss';

const Box = (props: any) => {
  const meshRef = useRef();
  return (
    <mesh {...props} scale={[0.95, 0.95, 0.95]} ref={meshRef}>
      <RoundedBox args={[1, 1, 1]} radius={0.03}>
        <meshStandardMaterial color={new THREE.Color(`hsl(${Math.round(Math.random() * 360)}, 60%, 50%)`)} />
      </RoundedBox>
    </mesh>
  );
};

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        <group>
          <group>
            <Box position={[-1, 1, -1]} />
            <Box position={[0, 1, -1]} />
            <Box position={[1, 1, -1]} />
            <Box position={[-1, 1, 0]} />
            <Box position={[0, 1, 0]} />
            <Box position={[1, 1, 0]} />
            <Box position={[-1, 1, 1]} />
            <Box position={[0, 1, 1]} />
            <Box position={[1, 1, 1]} />
          </group>

          <group rotation={[0, Math.PI / 4, 0]}>
            <Box position={[-1, 0, -1]} />
            <Box position={[0, 0, -1]} />
            <Box position={[1, 0, -1]} />
            <Box position={[-1, 0, 0]} />

            <Box position={[1, 0, 0]} />
            <Box position={[-1, 0, 1]} />
            <Box position={[0, 0, 1]} />
            <Box position={[1, 0, 1]} />
          </group>

          <group>
            <Box position={[-1, -1, -1]} />
            <Box position={[0, -1, -1]} />
            <Box position={[1, -1, -1]} />
            <Box position={[-1, -1, 0]} />
            <Box position={[0, -1, 0]} />
            <Box position={[1, -1, 0]} />
            <Box position={[-1, -1, 1]} />
            <Box position={[0, -1, 1]} />
            <Box position={[1, -1, 1]} />
          </group>
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Hero;
