"use client"

import { useRef } from "react"
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, useScroll } from "@react-three/drei";


const Shape = () => {
    const ref = useRef<THREE.Mesh>(null!);
    const scroll = useScroll();


    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.y += delta * 0.2;

            const {x, y} = state.mouse;
            ref.current.rotation.x += y * delta * 0.5;
            ref.current.rotation.y += x * delta * 0.5;
        }
    });

    return (
        <Icosahedron ref={ref} args={[2.5, 0]}>
            <meshStandardMaterial wireframe color="#61ADFB"/>
        </Icosahedron>
    )
}

export const HeroAnimation = () => {
    return (
        <Canvas>
            <ambientLight intensity={1}/>
            <directionalLight position={[5,5,5]} intensity={2}/>
            <Shape/>
        </Canvas>
    )
}