/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 scene.gltf 
Author: Lyskilde (https://sketchfab.com/longtail)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/garden-urn-c0c7f5fa24704a23b0f3cbdd689b8176
Title: Garden Urn
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.GardenUrn_GardenUrn_0.geometry} material={materials.GardenUrn} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Frowers_Flowers_0.geometry} material={materials.Flowers} position={[18.403, 96.596, 15.648]} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/scene.gltf')
