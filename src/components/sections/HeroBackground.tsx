'use client'

import { Plane } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { vertexShader, fragmentShader } from '../../shaders/GradientShader.glsl'

export default function HeroBackground() {
  const { viewport, size, mouse } = useThree()
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useRef({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2() },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
  })

  const target = useRef(new THREE.Vector2())

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    uniforms.current.u_time.value = t

    const targetX = (mouse.x + 1) * 0.5
    const targetY = (mouse.y + 1) * 0.5
    target.current.set(targetX, targetY)
    uniforms.current.u_mouse.value.lerp(target.current, 0.1)

    uniforms.current.u_resolution.value.set(size.width, size.height)
  })

  return (
    <Plane
      args={[viewport.width * 1.2, viewport.height * 1.2]}
      
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </Plane>
  )
}

