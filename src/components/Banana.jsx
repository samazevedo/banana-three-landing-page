import * as THREE from 'three'
import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import {
    EffectComposer,
    DepthOfField,
    EffectComposerContext,
} from '@react-three/postprocessing'

function Model({ z }) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/bananacp.glb')
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(viewport.height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    })

    useFrame((state) => {
        ref.current.position.set(data.x * width, (data.y += 0.02), z)
        ref.current.rotation.set(
            (data.rX += 0.001),
            (data.rY += 0.001),
            (data.rZ += 0.001)
        )
        // limiting position vh
        if (data.y > height) data.y = -height
    })
    return (
        <mesh
            ref={ref}
            geometry={nodes.Object_17.geometry}
            material={materials.skin}
            material-emissive='orange'
        />
    )
}

export const Banana = ({ count = 110, depth = 80 }) => {
    return (
        <>
            <Canvas
                gl={{ alpha: false }}
                camera={{ near: 0.01, far: 110, fov: 30 }}
            >
                <color attach='background' args={['#F7CA4C']} />
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={null}>
                    {Array.from({ length: count }, (_, i) => (
                        <Model
                            key={i}
                            z={-(i / count) * depth - 20}
                            scale={0.5}
                        />
                    ))}
                    <Environment preset='sunset' />
                    <EffectComposer>
                        <DepthOfField
                            target={[0, 0, depth / 2]}
                            focalLength={0.4}
                            bokehScale={8}
                            height={900}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </>
    )
}
