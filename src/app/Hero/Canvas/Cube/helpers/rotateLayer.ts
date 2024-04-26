import * as THREE from 'three';
import { Layer } from './types';

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

const rotateLayer = (props: { layer: Layer; inverted: boolean; cubeContainer: THREE.Group<THREE.Object3DEventMap> | null; setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  const { layer, inverted, cubeContainer, setIsAnimating } = props;
  const axis = getAxis(layer);
  const layerPos = getLayerPos(layer);
  if (cubeContainer) {
    const cubies = cubeContainer.children.filter((cubie) => cubie.position[axis] === layerPos);
    cubies.forEach((cubie) => cubeContainer.remove(cubie));
    const group = new THREE.Group();
    cubies.forEach((cubie) => group.add(cubie));
    cubeContainer.add(group);
    let angle = 0;
    let angleTarget = Math.PI / 2;
    let angleDirection = getAngleDirection(layer, inverted);
    const animate = () => {
      setIsAnimating(true);
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
          clone.position.set(Math.round(position.x), Math.round(position.y), Math.round(position.z));
          clone.rotation.setFromQuaternion(rotation);
          cubeContainer.add(clone);
        });
        cubeContainer.remove(group);
        setIsAnimating(false);
      }
    };
    animate();
  }
}

export default rotateLayer;
