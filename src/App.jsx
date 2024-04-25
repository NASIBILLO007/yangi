 
// import './App.css';

// function App() {
//   return (
//     <div className="App">
        
//     </div>  
//   );
// }

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';


function ThreeJSWaterWaves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene(); // Uch o'lchovli sahna
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000); // Kamera
    const renderer = new THREE.WebGLRenderer({ canvas }); // Renderer
    renderer.setSize(canvas.clientWidth, canvas.clientHeight); // Renderer o'lchamini sozlash

    // To'g'ri sahnaga nisbatan kamerani joylashtirish
    camera.position.z = 4;

    // Geometriya yaratish
    const geometry = new THREE.PlaneGeometry(10, 20, 50, 100); // To'rtburchakli geometriya
    const material = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true }); // Wireframe material
    const plane = new THREE.Mesh(geometry, material); // Mesh yaratish

    // Sahnaga meshni qo'shish
    scene.add(plane);

    // Animatsiya funksiyasi
    const animate = function () {
      requestAnimationFrame(animate);

      // To'lqinlarni yaratish uchun sinusoid funktsiyasini ishlatish
      const time = Date.now() * 0.001; // Vaqtni boshqarish
      const vertices = geometry.attributes.position.array;

      // To'lqin effekti yaratish
      for (let i = 0; i < vertices.length; i += 3 ) {
        vertices[i + 2] = Math.sin(time + i); // Z-koordinatasi orqali to'lqin
      }

      geometry.attributes.position.needsUpdate = true; // Geometriyani yangilash

      renderer.render(scene, camera); // Render qilish
    };

    animate(); // Animatsiyani boshlash

    return () => {
      cancelAnimationFrame(animate); // Tozalash
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '  100%', height: '4000px' }} />;
}

export default ThreeJSWaterWaves;
