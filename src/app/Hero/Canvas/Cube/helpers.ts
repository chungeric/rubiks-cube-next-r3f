import * as THREE from 'three';

export const addStickers = (cubie: any, x: number, y: number, z: number) => {
  if (z === 1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide }));
      sticker.position.set(0, 0, 0.501);
      cubie.add(sticker);
  }
  if (z === -1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ color: 'orange', side: THREE.DoubleSide }));
    sticker.position.set(0, 0, -0.501);
    cubie.add(sticker);
  }
};
