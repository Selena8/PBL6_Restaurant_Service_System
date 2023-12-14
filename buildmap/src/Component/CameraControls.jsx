import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

function CameraControls() {
  const { camera } = useThree();
  const controls = useRef();

  // Thiết lập các thuộc tính của thanh điều khiển camera
  useFrame(() => controls.current.update());

  return <orbitControls ref={controls} args={[camera]} />;
}

export default CameraControls;
