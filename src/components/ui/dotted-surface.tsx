'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

/**
 * DottedSurface
 *
 * - Renders a wavy dotted grid using Three.js
 * - Uses full viewport size for the Three.js renderer
 *   and lets the parent crop it with overflow-hidden.
 * - Designed to be used as a background inside a relative container
 *   (e.g. footer) with something like:
 *
 *   <DottedSurface className="absolute inset-0 -z-10 pointer-events-none" />
 */
export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keep refs for cleanup
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    animationId: number;
  } | null>(null);

  // Simple WebGL availability check
  function isWebGLAvailable() {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!(window.WebGLRenderingContext && gl);
    } catch {
      return false;
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      console.warn('WebGL not available, skipping DottedSurface');
      return;
    }

    // ----- SCENE SETUP -----
    const COLS = 30;
    const ROWS = 15;
    const SPACING = 0.2;

    // Use container dimensions, not viewport
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
    } catch (error) {
      console.warn('Failed to create WebGLRenderer for DottedSurface', error);
      return;
    }

    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // transparent, parent bg shows through

    container.appendChild(renderer.domElement);

    // ----- GEOMETRY (GRID OF POINTS) -----
    const positions: number[] = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < COLS; ix++) {
      for (let iy = 0; iy < ROWS; iy++) {
        const x = (ix - COLS / 2) * SPACING;
        const y = (iy - ROWS / 2) * SPACING;
        const z = 0;
        positions.push(x, y, z);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    // ----- MATERIAL (VISIBLE WHITE DOTS) -----
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      vertexColors: false,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ----- ANIMATION LOOP -----
    let count = 0;
    let animationId = 0;

    const animate = () => {
      animationId = window.requestAnimationFrame(animate);

      const positionAttribute = geometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;
      const arr = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < COLS; ix++) {
        for (let iy = 0; iy < ROWS; iy++) {
          const index = i * 3;

          // Sine wave in Y
          const waveY =
            (Math.sin((ix + count) * 0.3) * 0.3 +
              Math.sin((iy + count) * 0.5) * 0.3) *
            0.5;
          arr[index + 1] = (iy - ROWS / 2) * SPACING + waveY;

          i++;
        }
      }

      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.08;
    };

    // ----- RESIZE HANDLER -----
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight || 1;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Store refs and container for cleanup
    const domElement = renderer.domElement;
    const containerElement = containerRef.current;

    threeRef.current = {
      scene,
      camera,
      renderer,
      points,
      animationId,
    };

    // ----- CLEANUP -----
    return () => {
      window.removeEventListener('resize', handleResize);

      if (threeRef.current) {
        window.cancelAnimationFrame(threeRef.current.animationId);

        // Dispose geometry and material
        threeRef.current.points.geometry.dispose();
        const m = threeRef.current.points.material;
        if (Array.isArray(m)) {
          m.forEach((mat) => mat.dispose());
        } else {
          m.dispose();
        }

        threeRef.current.renderer.dispose();

        if (containerElement && domElement.parentElement === containerElement) {
          containerElement.removeChild(domElement);
        }
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
}
