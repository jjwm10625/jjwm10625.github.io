import * as THREE from "three";
import { lockScreenUrl } from "./lockScreen";
export function createScreenTexture() {
  const texture = new THREE.Texture();
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const img = new Image();
  img.onload = () => {
    texture.image = img;
    texture.needsUpdate = true;
  };
  img.src = lockScreenUrl();
  return texture;
}
