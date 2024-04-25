import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const Cube = () => {
  const ref = useRef<THREE.Group>(null);

  // Create the 3x3x3 cube
  useEffect(() => {
    const container = ref.current;
    const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white'];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          let color = 'white';
          if (x === 1) color = colors[3];
          const cubie = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color }));
          cubie.scale.set(0.95, 0.95, 0.95);
          cubie.position.set(x, y, z);
          container?.add(cubie);
        }
      }
    }
  }, []);

  const [isAnimating, setIsAnimating] = useState(false);

  // Handle keypress
  useEffect(() => {
    const container = ref.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimating) return;
      if (event.key === 'u') {
        if (container) {
          const cubies = container.children.filter((cubie) => cubie.position.y === 1);
          cubies.forEach((cubie) => container.remove(cubie));
          const group = new THREE.Group();
          cubies.forEach((cubie) => group.add(cubie));
          container.add(group);
          let angle = 0;
          const animate = () => {
            setIsAnimating(true);
            angle -= 0.2;
            group.rotation.y = angle;
            if (angle > -(Math.PI / 2)) {
              requestAnimationFrame(animate);
            } else {
              group.children.forEach((cubie, i) => {
                const clone = cubie.clone();
                const position = cubie.getWorldPosition(new THREE.Vector3());
                clone.position.set(Math.round(position.x), Math.round(position.y), Math.round(position.z));
                container.add(clone);
              });
              container.remove(group);
              setIsAnimating(false);
            }
          };
          animate();
        }
      }
      if (event.key === 'l') {
        if (container) {
          const cubies = container.children.filter((cubie) => cubie.position.x === -1);
          cubies.forEach((cubie) => container.remove(cubie));
          const group = new THREE.Group();
          cubies.forEach((cubie) => group.add(cubie));
          container.add(group);
          let angle = 0;
          const animate = () => {
            setIsAnimating(true);
            angle += 0.2;
            group.rotation.x = angle;
            if (angle < Math.PI / 2) {
              requestAnimationFrame(animate);
            } else {
              group.children.forEach((cubie, i) => {
                const clone = cubie.clone();
                const position = cubie.getWorldPosition(new THREE.Vector3());
                clone.position.set(Math.round(position.x), Math.round(position.y), Math.round(position.z));
                container.add(clone);
              });
              container.remove(group);
              setIsAnimating(false);
            }
          };
          animate();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);
  return <group ref={ref} />;
};

export default Cube;
