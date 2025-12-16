"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ParticleBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Initialize scene
        const scene = new THREE.Scene();

        // Setup camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;

        const posArray = new Float32Array(particlesCount * 3);
        const scaleArray = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Position particles in a 3D space
            posArray[i] = (Math.random() - 0.5) * 10;

            // Set scale variations for each particle
            if (i % 3 === 0) {
                scaleArray[i / 3] = Math.random();
            }
        }

        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(posArray, 3)
        );
        particlesGeometry.setAttribute(
            "scale",
            new THREE.BufferAttribute(scaleArray, 1)
        );

        // Create material with custom shader
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x60a5fa,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });

        // Create point cloud
        const particlesMesh = new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );
        scene.add(particlesMesh);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Mouse movement tracking
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Slowly rotate the particle system
            particlesMesh.rotation.x += 0.0001;
            particlesMesh.rotation.y += 0.0002;

            // Respond to mouse movement
            particlesMesh.rotation.x += mouseY * 0.0002;
            particlesMesh.rotation.y += mouseX * 0.0002;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup function
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);

            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose resources
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default ParticleBackground;
