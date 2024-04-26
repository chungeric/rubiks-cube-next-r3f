import * as THREE from 'three';

const addStickers = (cubie: any, x: number, y: number, z: number) => {
  if (z === 1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'red' }));
    sticker.position.set(0, 0, 0.501);
    cubie.add(sticker);
  }
  if (z === -1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'orange' }));
    sticker.position.set(0, 0, -0.501);
    cubie.add(sticker);
  }
  if (x === 1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'blue' }));
    sticker.position.set(0.501, 0, 0);
    sticker.rotation.y = Math.PI / 2;
    cubie.add(sticker);
  }
  if (x === -1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'green' }));
    sticker.position.set(-0.501, 0, 0);
    sticker.rotation.y = Math.PI / 2;
    cubie.add(sticker);
  }
  if (y === 1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'white' }));
    sticker.position.set(0, 0.501, 0);
    sticker.rotation.x = Math.PI / 2;
    cubie.add(sticker);
  }
  if (y === -1) {
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'yellow' }));
    sticker.position.set(0, -0.501, 0);
    sticker.rotation.x = Math.PI / 2;
    cubie.add(sticker);
  }
};

export default addStickers;
