import boxGeometry from "../objects/BoxGeometry.js";

export default function Floor({position, texture}) {
    return <group position={position}>
        <mesh geometry={boxGeometry}
              material={texture}
              position={[0, -0.1, 0]}
              scale={[4, 0.2, 4]}
              receiveShadow
        />
    </group>
}