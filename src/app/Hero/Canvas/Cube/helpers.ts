import * as THREE from 'three';

export const addStickers = (cubie: any, x: number, y: number, z: number) => {
  if (z === 1) {
    for (let i = 0; i < 3; i++) {
      const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ color: 0xFF0000 }));
      sticker.position.set(0, 0, 0.501 * (i - 1));
      cubie.add(sticker);
    }
  }
};
