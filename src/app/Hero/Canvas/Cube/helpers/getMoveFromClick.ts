import * as THREE from 'three';
import { Move } from './types';

const getMoveFromClick = (clickButton: number, faceDir: THREE.Vector3): Move | void => {
  // Left click
  if (clickButton === 0) {
    if (faceDir.equals(new THREE.Vector3(0, 0, 1))) return 'f';
    if (faceDir.equals(new THREE.Vector3(0, 0, -1))) return 'b';
    if (faceDir.equals(new THREE.Vector3(1, 0, 0))) return 'r';
    if (faceDir.equals(new THREE.Vector3(-1, 0, 0))) return 'l';
    if (faceDir.equals(new THREE.Vector3(0, 1, 0))) return 'u';
    if (faceDir.equals(new THREE.Vector3(0, -1, 0))) return 'd';
  }
  // Right click - inverted (prime moves)
  if (clickButton === 2) {
    if (faceDir.equals(new THREE.Vector3(0, 0, 1))) return 'F';
    if (faceDir.equals(new THREE.Vector3(0, 0, -1))) return 'B';
    if (faceDir.equals(new THREE.Vector3(1, 0, 0))) return 'R';
    if (faceDir.equals(new THREE.Vector3(-1, 0, 0))) return 'L';
    if (faceDir.equals(new THREE.Vector3(0, 1, 0))) return 'U';
    if (faceDir.equals(new THREE.Vector3(0, -1, 0))) return 'D';
  }
};

export default getMoveFromClick;
