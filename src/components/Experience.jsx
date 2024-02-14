import { useRef, useEffect } from 'react';
import { Environment, OrbitControls, useTexture, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import * as THREE from 'three';

export const Experience = () => {
  const textureUrl = '/cherry.jpg';

  const texture = useTexture(textureUrl);

  const { viewport, camera } = useThree();
  const textRef = useRef();

  useEffect(() => {
    // Set camera position
    camera.position.set(0.007565235476469062, -14.026443474691172, 1.3771091356119574);

    // Set camera orientation using quaternion
    camera.quaternion.set(0.671670317296441, 0.002034924135816366, -0.001844917604681038, 0.7408450851734738);
    camera.updateProjectionMatrix();

    // Optional: Apply camera orientation to text
    if (textRef.current) {
      const euler = new THREE.Euler().setFromQuaternion(camera.quaternion);
      textRef.current.rotation.set(euler.x, euler.y, euler.z);
    }
  }, [camera]);

  // Adjust scale and position based on viewport dimensions
  const avatarScale = Math.min(viewport.width, viewport.height) / 10;
  const avatarPosition = [0, -10, 0];
  const textSize = Math.min(viewport.width, viewport.height) * 0.05;

  return (
    <>
      <OrbitControls />
      <Avatar position={avatarPosition} scale={[avatarScale, avatarScale, avatarScale]} />
      <Environment preset="sunset" />
      <ambientLight intensity={1} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <Text
        ref={textRef}
        color="#FFFFFF" // Text color
        fontSize={textSize} // Size of the font
        maxWidth={viewport.width / 2} // Max width of the text block
        position={[0, 1, 3]} // Position of the text in the scene
      >
        Happy Valentine Day Xiao Huey
      </Text>
    </>
  );
};
