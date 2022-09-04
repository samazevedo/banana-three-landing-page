import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/bananacp.glb')
    return (
        <group {...props} dispose={null} ref={group}>
            <mesh
                geometry={nodes.Object_17.geometry}
                material={materials.skin}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload('/bananacp.glb')
