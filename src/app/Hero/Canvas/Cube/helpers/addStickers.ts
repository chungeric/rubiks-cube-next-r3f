import * as THREE from 'three';

function createShape( ctx: THREE.Shape, x: number, y: number, width: number, height: number, radius: number ) {
  x = x - width / 2;
  y = y - height / 2;
  ctx.moveTo( x, y + radius );
  ctx.lineTo( x, y + height - radius );
  ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
  ctx.lineTo( x + width - radius, y + height );
  ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  ctx.lineTo( x + width, y + radius );
  ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
  ctx.lineTo( x + radius, y );
  ctx.quadraticCurveTo( x, y, x, y + radius );
}

const addStickers = (cubie: THREE.Group, x: number, y: number, z: number) => {
  const shape = new THREE.Shape();
  createShape( shape, 0, 0, 0.9, 0.9, 0.1 );
  const stickerGeometry = new THREE.ShapeGeometry( shape );
  const stickerMaterial = new THREE.MeshBasicMaterial();
  const stickerMesh = new THREE.Mesh(stickerGeometry, stickerMaterial);
  stickerMesh.userData.name = 'sticker';
  if (z === 1) {
    const sticker = stickerMesh.clone();
    sticker.material = stickerMaterial.clone();
    sticker.material.color.set('red');
    sticker.position.set(0, 0, 0.502);
    cubie.add(sticker);
  }
  if (z === -1) {
    const sticker = stickerMesh.clone();
    sticker.material = stickerMaterial.clone();
    sticker.material.color.set('orange');
    sticker.position.set(0, 0, -0.502);
    sticker.rotation.x = Math.PI;
    cubie.add(sticker);
  }
  if (x === 1) {
    const sticker = stickerMesh.clone();
    sticker.material = stickerMaterial.clone();
    sticker.material.color.set('blue');
    sticker.position.set(0.502, 0, 0);
    sticker.rotation.y = Math.PI / 2;
    cubie.add(sticker);
  }
  if (x === -1) {
    const sticker = stickerMesh.clone();
    sticker.material = stickerMaterial.clone();
    sticker.material.color.set('green');
    sticker.position.set(-0.502, 0, 0);
    sticker.rotation.y = Math.PI / 2 * 3;
    cubie.add(sticker);
  }
  if (y === 1) {
    const sticker = stickerMesh.clone();
    sticker.material = stickerMaterial.clone();
    sticker.material.color.set('white');
    sticker.position.set(0, 0.502, 0);
    sticker.rotation.x = Math.PI / 2 * 3;
    cubie.add(sticker);
  }
  if (y === -1) {
    const sticker = stickerMesh.clone();
    sticker.material = stickerMaterial.clone();
    sticker.material.color.set('yellow');
    sticker.position.set(0, -0.502, 0);
    sticker.rotation.x = Math.PI / 2;
    cubie.add(sticker);
  }
};

export default addStickers;
