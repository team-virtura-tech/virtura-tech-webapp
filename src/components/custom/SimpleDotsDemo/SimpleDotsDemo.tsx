'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SimpleDotsProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export const SimpleDotsDemo = ({ className, ...props }: SimpleDotsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth || container.clientWidth;
    const height = container.offsetHeight || container.clientHeight;

    console.log('Init with dimensions:', { width, height });

    // Skip if no dimensions
    if (width === 0 || height === 0) {
      console.warn('Container has zero dimensions, skipping render');
      return;
    }

    const COLS = 30;
    const ROWS = 15;
    const SPACING = 0.2;

    // Create Three.js scene
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
    } catch (error) {
      console.warn('Failed to create WebGLRenderer', error);
      return;
    }
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // Create dot grid
    const positions: number[] = [];

    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const x = (i - COLS / 2) * SPACING;
        const y = (j - ROWS / 2) * SPACING;
        const z = 0;
        positions.push(x, y, z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let time = 0;

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight || 1;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate dots with wave
      const posAttr = geometry.getAttribute('position');
      const arr = posAttr.array as Float32Array;

      let idx = 0;
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const waveY =
            (Math.sin((i + time) * 0.3) * 0.3 +
              Math.sin((j + time) * 0.5) * 0.3) *
            0.5;
          arr[idx * 3 + 1] = (j - ROWS / 2) * SPACING + waveY;
          idx++;
        }
      }
      posAttr.needsUpdate = true;

      time += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none', className)}
      {...props}
    />
  );
};
