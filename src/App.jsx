import React from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column', // Align items vertically
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#808080', 
    overflow: 'hidden',
  };

  const canvasStyle = {
    flex: 1, // Make the canvas fill remaining space vertically
    width: '100%',
    height: '100%',
  };

  const audioStyle = {
    marginTop: '20px', // Adjust as needed
  };

  return (
    <div style={appStyle}>
      <Canvas
        shadows
        camera={{ position: [0, -3, 7], fov: 30 }}
        style={canvasStyle}
      >
        <color attach="background" args={["#808080"]} />
        <Experience />
      </Canvas>
      <audio src="/Nice.mp3" controls autoPlay loop style={audioStyle} />
    </div>
  );
}

export default App;
