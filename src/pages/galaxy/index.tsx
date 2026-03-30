import React, { useEffect, useRef } from "react";
import { GalaxyScene } from "./GalaxyScene";

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new GalaxyScene(mountRef.current, () => { });

    scene.renderer.setAnimationLoop(() => scene.render());

    return () => scene.destroy();
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default App;