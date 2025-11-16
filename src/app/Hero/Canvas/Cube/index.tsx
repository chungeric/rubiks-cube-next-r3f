import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import addStickers from './helpers/addStickers';
import rotateLayer from './helpers/rotateLayer';
import { MOVES } from './helpers/consts';
import { Layer } from './helpers/types';
import useKeyPress from '@/hooks/useKeyPress';
import getBreakPosition from './helpers/getBreakPosition';
import { lerp } from 'three/src/math/MathUtils.js';
import getMoveFromClick from './helpers/getMoveFromClick';
import { Billboard, Html, Text } from '@react-three/drei';

const Cube = ({ breakCube }: { breakCube: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  const isAnimating = useRef(false);
  const raycaster = useRef(new THREE.Raycaster());
  const keyPressed = useKeyPress();
  const [pointerEntered, setPointerEntered] = useState(false);
  const { pointer, camera } = useThree();

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
    if (MOVES.includes(key)) {
      rotateLayer({ move: key, cubeContainer: container });
    }
  }, [keyPressed]);

  // Handle sticker click
  useEffect(() => {
    let clickedIntersect: THREE.Intersection | null = null;
    const onMouseDown = (e: MouseEvent) => {
      raycaster.current.setFromCamera(pointer, camera);
      const intersects = raycaster.current.intersectObjects(ref.current?.children as THREE.Object3D[]);
      if (intersects.length > 0) {
        if (intersects[0].object.userData.name !== 'sticker') return;
        clickedIntersect = intersects[0];
      } else {
        clickedIntersect = null;
      }
    };
    const onMouseUp = (e: MouseEvent) => {
      const container = ref.current;
      raycaster.current.setFromCamera(pointer, camera);
      const intersects = raycaster.current.intersectObjects(ref.current?.children as THREE.Object3D[]);
      if (intersects.length > 0) {
        if (intersects[0].object.userData.name !== 'sticker') return;
        if (intersects[0].object.uuid !== clickedIntersect?.object.uuid) return;
        let faceDirection = intersects[0].object.getWorldDirection(new THREE.Vector3());
        faceDirection = faceDirection.round();
        const move = getMoveFromClick(e.button, faceDirection);
        if (move) {
          rotateLayer({ move, cubeContainer: container });
        }
      } else {
        clickedIntersect = null;
      }
    };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [pointer, camera]);

  // Detect pointer hover
  useFrame(({ camera, pointer }) => {
    if (pointerEntered === false) return;
    raycaster.current.setFromCamera(pointer, camera);
    const intersects = raycaster.current.intersectObjects(ref.current?.children as THREE.Object3D[]);
    if (intersects.length > 0) {
      const hoveredCubie = intersects[0]?.object.parent;
      // console.log('hoveredCubie', hoveredCubie);
    }
  });

  // Detect solve
  useFrame(() => {
    const container = ref.current;
    if (!container) return;
    const isAnimating = container.children.find((child) => child.userData.name !== 'cubie');
    if (isAnimating) return;
    const cubies = container.children.filter((cubie) => cubie.userData.name === 'cubie');
    if (
      cubies.every((cubie) => {
        return (
          cubie.position.x === cubie.userData.solvedPosition.x &&
          cubie.position.y === cubie.userData.solvedPosition.y &&
          cubie.position.z === cubie.userData.solvedPosition.z
        );
      })
    ) {
      // console.log('Solved!');
    }
  });

  // Break cube
  const cubeRotationTarget = useRef(0);
  useEffect(() => {
    if (!breakCube) {
      const container = ref.current;
      if (!container) return;
      if (container.rotation.x > Math.PI) {
        cubeRotationTarget.current = Math.PI * 2;
      } else {
        cubeRotationTarget.current = 0;
      }
    }
  }, [breakCube]);
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
      if (Math.abs(cubie.position.x - cubie.userData[targetUserDataPosition].x) < 0.001)
        cubie.position.x = cubie.userData[targetUserDataPosition].x;
      if (Math.abs(cubie.position.y - cubie.userData[targetUserDataPosition].y) < 0.001)
        cubie.position.y = cubie.userData[targetUserDataPosition].y;
      if (Math.abs(cubie.position.z - cubie.userData[targetUserDataPosition].z) < 0.001)
        cubie.position.z = cubie.userData[targetUserDataPosition].z;
    });
    if (breakCube) {
      container.rotation.x += 0.01;
      container.rotation.y += 0.01;
      if (container.rotation.x > Math.PI * 2) container.rotation.x = 0;
      if (container.rotation.y > Math.PI * 2) container.rotation.y = 0;
    } else {
      container.rotation.x = lerp(container.rotation.x, cubeRotationTarget.current, 0.1);
      container.rotation.y = lerp(container.rotation.y, cubeRotationTarget.current, 0.1);
    }
  });

  return (
    <group ref={ref} userData={{ name: 'cube' }} onPointerEnter={() => setPointerEntered(true)}>
      <Text
        position={[0, 1.6, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        U
      </Text>
      <Text
        position={[0, -1.6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        D
      </Text>
      <Text
        position={[-1.6, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        L
      </Text>
      <Text
        position={[1.6, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        R
      </Text>
      <Text position={[0, 0, 1.6]} rotation={[0, 0, 0]} fontSize={0.5} color="black" anchorX="center" anchorY="middle">
        F
      </Text>
      <Text
        position={[0, 0, -1.6]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        B
      </Text>
    </group>
  );
};

export default Cube;
