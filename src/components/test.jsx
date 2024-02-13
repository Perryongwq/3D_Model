import { useRef, useEffect } from 'react';
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = () => {
  const texture = useTexture('../public/cherry.jpg');
  const { viewport, camera } = useThree();
  const orbitControlsRef = useRef();

  // This position brings the avatar down to the ground plane.
  const avatarPosition = [0, -10, 0]; // Y-position adjusted to 0.

  useEffect(() => {
    // Function to log camera orientation
    const logCameraOrientation = () => {
      console.log('Camera Orientation:', {
        position: camera.position.toArray(),
        rotation: camera.rotation.toArray(),
        quaternion: camera.quaternion.toArray(),
      });
    };

    // Obtain the OrbitControls instance and add a 'change' event listener to log the camera orientation
    const controls = orbitControlsRef.current;
    if (controls) {
      controls.addEventListener('change', logCameraOrientation);

      // Cleanup function to remove the event listener
      return () => controls.removeEventListener('change', logCameraOrientation);
    }
  }, [camera]); // Depend on the camera to ensure the effect is correctly set up

  return (
    <>
      <OrbitControls ref={orbitControlsRef} />
      <Avatar position={avatarPosition} scale={[3/4, 3/4, 3/4]} />
      <Environment preset="sunset" />
      <ambientLight intensity={1} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};
