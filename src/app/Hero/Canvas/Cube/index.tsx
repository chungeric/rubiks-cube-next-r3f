import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import addStickers from './helpers/addStickers';
import rotateLayer from './helpers/rotateLayer';
import { LAYERS } from './helpers/consts';
import { Layer } from './helpers/types';
import useKeyPress from '@/hooks/useKeyPress';

const Cube = () => {
  const ref = useRef<THREE.Group>(null);
  const isAnimating = useRef(false);

  // Create the 3x3x3 cube
  useEffect(() => {
    const container = ref.current;
    // Create the cubies
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          const cubie = new THREE.Group();
          cubie.position.set(x, y, z);
          const base = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x000000 }));
          cubie.add(base);
          addStickers(cubie, x, y, z);
          cubie.scale.set(0.98, 0.98, 0.98);
          container?.add(cubie);
        }
      }
    }
    return () => {
      container?.clear();
    };
  }, []);

  const keyPressed = useKeyPress();

  // Handle keypress
  useEffect(() => {
    const container = ref.current;
    const key = keyPressed as Layer;
    if (key === null || isAnimating.current === true) return;
    if (LAYERS.includes(key)) {
      rotateLayer({ layer: key, inverted: false, cubeContainer: container, isAnimatingRef: isAnimating });
    }
  }, [keyPressed]);

  return <group ref={ref} />;
};

export default Cube;
