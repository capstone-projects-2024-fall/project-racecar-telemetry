import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const MovingSphereRand = () => {
  const mountRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [velocity, setVelocity] = useState({ vx: 0.01, vy: 0.01, vz: 0.01 }); // Initial velocity

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the sphere's position based on velocity
      sphere.position.x = position.x;
      sphere.position.y = position.y;
      sphere.position.z = position.z;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [position]);

  // Function to update position based on velocity
  const updatePosition = () => ({
    x: parseFloat(position.x) + parseFloat(velocity.vx),
    y: parseFloat(position.y) + parseFloat(velocity.vy),
    z: parseFloat(position.z) + parseFloat(velocity.vz),
  });

  // Function to occasionally adjust velocity for more natural movement
  const updateVelocity = () => ({
    vx: velocity.vx + (Math.random() * 0.02 - 0.01), // Slightly adjust velocity in the range (-0.01, 0.01)
    vy: velocity.vy + (Math.random() * 0.02 - 0.01),
    vz: velocity.vz + (Math.random() * 0.02 - 0.01),
  });

  // Update position every 50ms for smooth movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(updatePosition());

      // Occasionally adjust velocity to simulate course changes
      if (Math.random() < 0.1) { // 10% chance to update velocity every interval
        setVelocity(updateVelocity());
      }
    }, 50); // Update every 50ms

    return () => clearInterval(interval); // Clear interval on unmount
  }, [position, velocity]);

  return (
    <div>
      <div ref={mountRef}></div>
      <div style={{ position: 'relative', top: 20, left: 20, color: 'white' }}>
        <p>X: {position.x.toFixed(2)}</p>
        <p>Y: {position.y.toFixed(2)}</p>
        <p>Z: {position.z.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MovingSphereRand;
