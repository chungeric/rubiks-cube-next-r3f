import * as THREE from 'three';
import { Layer, Move } from './types';
import getBreakPosition from './getBreakPosition';

const getAxis = (layer: Layer) => {
  switch (layer) {
    case 'u':
    case 'd':
      return 'y';
    case 'l':
    case 'r':
    case 'm':
      return 'x';
    case 'f':
    case 'b':
      return 'z';
  };
}

const getLayerPos = (layer: Layer) => {
  switch (layer) {
    case 'u':
    case 'r':
    case 'f':
      return 1;
    case 'd':
    case 'l':
    case 'b':
      return -1;
    case 'm':
      return 0;
  }
}

const getAngleDirection = (layer: Layer, inverted: boolean) => {
  switch (layer) {
    case 'u':
    case 'r':
    case 'f':
    case 'm':
      return inverted ? 1 : -1;
    case 'd':
    case 'l':
    case 'b':
      return inverted ? -1 : 1;
  }
}

const getInverted = (move: Move) => {
  return move === move.toUpperCase();
}

const rotateLayer = (props: { move: Move; cubeContainer: THREE.Group | null; rotationSpeed?: number; }) => {
  const { move, cubeContainer, rotationSpeed = 0.2 } = props;
  const inverted = getInverted(move);
  const layer = move.toLowerCase() as Layer;
  const axis = getAxis(layer);
  const layerPos = getLayerPos(layer);

  if (cubeContainer) {
    const cubies = cubeContainer.children.filter((child) => child.userData.name === 'cubie' && child.position[axis] === layerPos);

    // Wait until all cubies are set in place to rotate a layer
    if ((layer !== 'm' && cubies.length !== 9) || (layer === 'm' && cubies.length !== 8)) return;

    // Delete cubies from cubeContainer and add them to a group
    cubies.forEach((cubie) => cubeContainer.remove(cubie));
    const group = new THREE.Group();
    cubies.forEach((cubie) => group.add(cubie));
    cubeContainer.add(group);

    // Create rotation axis vector in cubeContainer's local space
    const rotationAxis = new THREE.Vector3();
    rotationAxis[axis] = 1;

    // Animate rotation of group and place pieces back in place in container
    let angle = 0;
    let angleTarget = Math.PI / 2;
    let angleDirection = getAngleDirection(layer, inverted);
    const animate = () => {
      angle += (rotationSpeed * angleDirection);
      
      // Apply rotation around the local axis
      group.quaternion.setFromAxisAngle(rotationAxis, angle);
      
      if (Math.abs(angle) < angleTarget) {
        requestAnimationFrame(animate);
      } else {
        // Set final rotation
        group.quaternion.setFromAxisAngle(rotationAxis, angleTarget * angleDirection);
        
        group.children.forEach((cubie) => {
          const clone = cubie.clone();
          
          // Get position and rotation in cubeContainer's local space
          const localPosition = new THREE.Vector3();
          const localQuaternion = new THREE.Quaternion();
          
          group.localToWorld(localPosition.copy(cubie.position));
          cubeContainer.worldToLocal(localPosition);
          
          // Combine rotations: group's rotation * cubie's rotation
          localQuaternion.multiplyQuaternions(group.quaternion, cubie.quaternion);
          
          const newX = Math.round(localPosition.x);
          const newY = Math.round(localPosition.y);
          const newZ = Math.round(localPosition.z);
          
          clone.position.set(newX, newY, newZ);
          clone.userData.currentPosition = { x: newX, y: newY, z: newZ };
          clone.userData.breakPosition = getBreakPosition(newX, newY, newZ);
          clone.rotation.setFromQuaternion(localQuaternion);
          cubeContainer.add(clone);
        });
        cubeContainer.remove(group);
      }
    };
    animate();

  }
}

export default rotateLayer;