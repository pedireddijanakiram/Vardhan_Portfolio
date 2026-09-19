'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Layers, RotateCcw, Palette } from 'lucide-react';

interface Props {
  isExpanded?: boolean;
}

export const Three3dSandbox: React.FC<Props> = ({ isExpanded = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometryType, setGeometryType] = useState<'torus' | 'icosahedron' | 'knot'>('knot');
  const [isWireframe, setIsWireframe] = useState(false);
  const [accentColor, setAccentColor] = useState<'#00f0ff' | '#8b5cf6' | '#10b981'>('#00f0ff');
  const [stats, setStats] = useState({ vertices: 14400, triangles: 28800, fps: 60 });

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight || 260;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 2.5, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 50);
    pointLight2.position.set(-5, -5, -3);
    scene.add(pointLight2);

    // Geometry creation helper
    const createGeometry = (type: string) => {
      if (type === 'knot') {
        return new THREE.TorusKnotGeometry(1, 0.32, 128, 32);
      } else if (type === 'icosahedron') {
        return new THREE.IcosahedronGeometry(1.3, 3);
      } else {
        return new THREE.TorusGeometry(1.2, 0.4, 30, 100);
      }
    };

    const geometry = createGeometry(geometryType);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      wireframe: isWireframe,
      roughness: 0.25,
      metalness: 0.85,
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Update geometry stats
    const vertCount = geometry.attributes.position ? geometry.attributes.position.count : 0;
    const index = geometry.getIndex();
    const triCount = index ? index.count / 3 : vertCount / 3;
    setStats((s) => ({ ...s, vertices: vertCount, triangles: Math.floor(triCount) }));

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (meshRef.current && !isDraggingRef.current) {
        meshRef.current.rotation.x += 0.006;
        meshRef.current.rotation.y += 0.009;
      }

      renderer.render(scene, camera);

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setStats((prev) => ({ ...prev, fps: Math.round((frameCount * 1000) / (now - lastTime)) }));
        frameCount = 0;
        lastTime = now;
      }
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [geometryType, isWireframe, accentColor, isExpanded]);

  // Pointer drag controls for orbit rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !meshRef.current) return;
    const deltaX = e.clientX - prevMousePos.current.x;
    const deltaY = e.clientY - prevMousePos.current.y;

    meshRef.current.rotation.y += deltaX * 0.01;
    meshRef.current.rotation.x += deltaY * 0.01;

    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative w-full h-full min-h-[260px] bg-[#07070a] rounded-xl overflow-hidden border border-white/10 flex flex-col select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Top HUD Overlay */}
      <div className="relative z-10 flex items-center justify-between p-3 bg-gradient-to-b from-[#08080c]/90 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-zinc-300">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span>WebGL 2.0 Mesh</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{stats.fps} FPS</span>
          </div>
        </div>

        {/* Geometry & Shader Toggles */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe Shader"
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              isWireframe
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              const types: ('torus' | 'icosahedron' | 'knot')[] = ['knot', 'icosahedron', 'torus'];
              const nextIdx = (types.indexOf(geometryType) + 1) % types.length;
              setGeometryType(types[nextIdx]);
            }}
            title="Cycle Geometry"
            className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              const colors: ('#00f0ff' | '#8b5cf6' | '#10b981')[] = ['#00f0ff', '#8b5cf6', '#10b981'];
              const nextIdx = (colors.indexOf(accentColor) + 1) % colors.length;
              setAccentColor(colors[nextIdx]);
            }}
            title="Cycle Shader Palette"
            className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <Palette className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="mt-auto relative z-10 flex items-center justify-between p-3 bg-gradient-to-t from-[#08080c]/90 to-transparent pointer-events-none text-[10px] font-mono text-zinc-400">
        <div>
          <span>Verts: {stats.vertices.toLocaleString()}</span>
          <span className="mx-2 text-zinc-600">|</span>
          <span>Tris: {stats.triangles.toLocaleString()}</span>
        </div>
        <span className="text-zinc-500">Drag to Orbit · Click icons to tweak</span>
      </div>
    </div>
  );
};
