import React from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  const appStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#808080', 
    overflow: 'hidden',
  };

  return (
    <div style={appStyle}>
      <Canvas
        shadows
        camera={{ position: [0, -3, 7], fov: 30 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={["#808080"]} />
        <Experience />
      </Canvas>
      {/* Audio element to play music */}
      <audio src="/Nice.mp3" controls autoPlay loop />
    </div>
  );
}

export default App;
