import * as THREE from 'three';
import { Layer } from './types';
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

const rotateLayer = (props: { layer: Layer; inverted: boolean; cubeContainer: THREE.Group | null; }) => {
  const { layer, inverted, cubeContainer } = props;

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

    // Animate rotation of group and place pieces back in place in container
    let angle = 0;
    let angleTarget = Math.PI / 2;
    let angleDirection = getAngleDirection(layer, inverted);
    const animate = () => {
      angle += (0.2 * angleDirection);
      group.rotation[axis] = angle;
      if (Math.abs(angle) < angleTarget) {
        requestAnimationFrame(animate);
      } else {
        group.rotation[axis] = angleTarget * angleDirection;
        group.children.forEach((cubie) => {
          const clone = cubie.clone();
          const position = cubie.getWorldPosition(new THREE.Vector3());
          const rotation = cubie.getWorldQuaternion(new THREE.Quaternion());
          const newX = Math.round(position.x);
          const newY = Math.round(position.y);
          const newZ = Math.round(position.z);
          clone.position.set(newX, newY, newZ);
          clone.userData.originalPosition = { x: newX, y: newY, z: newZ };
          clone.userData.breakPosition = getBreakPosition(newX, newY, newZ);
          clone.rotation.setFromQuaternion(rotation);
          cubeContainer.add(clone);
        });
        cubeContainer.remove(group);
      }
    };
    animate();

  }
}

export default rotateLayer;
