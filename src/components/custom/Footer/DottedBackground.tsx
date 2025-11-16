'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type DottedSurfaceProps = {
  className?: string;
};

export const DottedSurface = ({ className }: DottedSurfaceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera with low, angled perspective
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      3000
    );
    camera.position.set(0, 250, 900);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Fog for atmospheric depth
    scene.fog = new THREE.Fog(0x000000, 500, 2500);

    // Grid configuration
    const AMOUNTX = 50; // Horizontal dots
    const AMOUNTY = 80; // Depth dots (into the distance)
    const SEPARATION = 80; // Space between dots
    const pointCount = AMOUNTX * AMOUNTY;

    // Create buffer geometry for all points
    const positions = new Float32Array(pointCount * 3);
    const indices = new Uint16Array(pointCount);

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        const y = 0;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        indices[i] = i;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('index', new THREE.BufferAttribute(indices, 1));

    // Point material with size attenuation for depth
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation
    let count = 0;
    let animationId: number;

    const animate = () => {
      // Update wave animation
      const positions = geometry.attributes.position.array as Float32Array;
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Sine wave in Y using grid indices, scaled up for visibility at distance
          const waveY =
            (Math.sin((ix + count) * 0.3) * 30 +
              Math.sin((iy + count) * 0.5) * 30) *
            0.5;

          positions[i * 3 + 1] = waveY;
          i++;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      count += 0.08;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-component="DottedSurface"
      className={className}
    />
  );
};

// Re-export as DottedBackground for backwards compatibility
export const DottedBackground = DottedSurface;
