import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import addStickers from './helpers/addStickers';
import rotateLayer from './helpers/rotateLayer';
import { LAYERS } from './helpers/consts';
import { Layer } from './helpers/types';
import useKeyPress from '@/hooks/useKeyPress';
import getBreakPosition from './helpers/getBreakPosition';
import { lerp } from 'three/src/math/MathUtils.js';

const Cube = ({ breakCube }: { breakCube: boolean; }) => {
  const ref = useRef<THREE.Group>(null);
  const isAnimating = useRef(false);
  const raycaster = useRef(new THREE.Raycaster());
  const keyPressed = useKeyPress();
  const [pointerEntered, setPointerEntered] = useState(false);

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
          cubie.userData.name = `cubie`;
          cubie.userData.solvedPosition = { x, y, z };
          cubie.userData.currentPosition = { x, y, z };
          cubie.userData.breakPosition = getBreakPosition(x, y, z);
          container?.add(cubie);
        }
      }
    }
    return () => {
      container?.clear();
    };
  }, []);

  // Handle keypress
  useEffect(() => {
    const container = ref.current;
    const key = keyPressed as Layer;
    if (key === null || isAnimating.current === true) return;
    if (LAYERS.includes(key)) {
      rotateLayer({ layer: key, inverted: false, cubeContainer: container });
    }
  }, [keyPressed]);

  useFrame(({ camera, pointer }) => {
    if (pointerEntered === false) return;
    raycaster.current.setFromCamera(pointer, camera);
    const intersects = raycaster.current.intersectObjects(ref.current?.children as THREE.Object3D[]);
    if (intersects.length > 0) {
      const cubiesHovered = intersects.reduce((accumulator: THREE.Object3D[], current: THREE.Intersection) => {
        if (current.object.parent && accumulator.indexOf(current.object.parent) === -1) {
          accumulator.push(current.object.parent);
        }
        return accumulator;
      }, []);
      console.log('cubiesHovered', cubiesHovered);
    }
  });

  // Detect solve
  useFrame(() => {
    const container = ref.current;
    if (!container) return;
    const isAnimating = container.children.find(child => child.userData.name !== 'cubie');
    if (isAnimating) return;
    const cubies = container.children.filter((cubie) => cubie.userData.name === 'cubie');
    if (cubies.every((cubie) => {
      return cubie.position.x === cubie.userData.solvedPosition.x &&
        cubie.position.y === cubie.userData.solvedPosition.y &&
        cubie.position.z === cubie.userData.solvedPosition.z;
    })) {
      console.log('Solved!');
    }
  });

  // Break cube
  useFrame(() => {
    const container = ref.current;
    if (!container) return;
    const cubies = container.children.filter((cubie) => cubie.userData.name === 'cubie');
    const targetUserDataPosition = breakCube ? 'breakPosition' : 'currentPosition';
    const lerpAmount = breakCube ? 0.25 : 0.15;
    cubies?.forEach((cubie, i) => {
      if (
        cubie.position.x === cubie.userData[targetUserDataPosition].x &&
        cubie.position.y === cubie.userData[targetUserDataPosition].y &&
        cubie.position.z === cubie.userData[targetUserDataPosition].z
      ) {
        return;
      }
      cubie.position.x = lerp(cubie.position.x, cubie.userData[targetUserDataPosition].x, lerpAmount);
      cubie.position.y = lerp(cubie.position.y, cubie.userData[targetUserDataPosition].y, lerpAmount);
      cubie.position.z = lerp(cubie.position.z, cubie.userData[targetUserDataPosition].z, lerpAmount);
      if (Math.abs(cubie.position.x - cubie.userData[targetUserDataPosition].x) < 0.001) cubie.position.x = cubie.userData[targetUserDataPosition].x;
      if (Math.abs(cubie.position.y - cubie.userData[targetUserDataPosition].y) < 0.001) cubie.position.y = cubie.userData[targetUserDataPosition].y;
      if (Math.abs(cubie.position.z - cubie.userData[targetUserDataPosition].z) < 0.001) cubie.position.z = cubie.userData[targetUserDataPosition].z;
    });
  });

  return <group ref={ref} onPointerEnter={() => setPointerEntered(true)} />;
};

export default Cube;
