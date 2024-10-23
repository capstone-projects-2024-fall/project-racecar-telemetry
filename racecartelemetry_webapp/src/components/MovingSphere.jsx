import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'; // React Three Fiber for handling Three.js
import { Sphere } from '@react-three/drei';  // Drei provides ready-to-use components like Sphere
import { db } from '@firebaseConfig';  // Import Firebase config
import { ref, onValue } from 'firebase/database';  // Firebase Realtime Database

const MovingSphere = ({ canID }) => {
  const sphereRef = useRef();  // Reference to the sphere

  useEffect(() => {
    if (!canID) return;

    const dataRef = ref(db, `CANdata/${canID}`);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();
        // Update sphere's position using X, Y, and Z values from the database
        if (sphereRef.current) {
          sphereRef.current.position.x = canData.X / 10; // Scale data for better visualization
          sphereRef.current.position.y = canData.Y / 10;
          sphereRef.current.position.z = canData.Z / 10;
        }
      }
    });

    return () => unsubscribe();
  }, [canID]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* Create a sphere that moves based on the accelerometer data */}
      <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="skyblue" />
      </Sphere>
    </Canvas>
  );
};

export default MovingSphere;
