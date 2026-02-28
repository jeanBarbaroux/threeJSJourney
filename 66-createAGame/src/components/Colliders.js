import boxGeometry from "../objects/BoxGeometry.js";
import WallMaterial from "../objects/WallMaterial.js";
import {CuboidCollider, RigidBody} from "@react-three/rapier";

export default function Colliders({length}) {
    return <>
        <RigidBody type="fixed" restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry}
                  material={WallMaterial}
                  position={[-2.1, 1, -length * 0.5 + 2]}
                  scale={[0.2, 2, length]}
                  receiveShadow
                  castShadow
            />
            <mesh geometry={boxGeometry}
                  material={WallMaterial}
                  position={[2.1, 1, -length * 0.5 + 2]}
                  scale={[0.2, 2, length]}
                  castShadow
                  receiveShadow
            />
            <mesh geometry={boxGeometry}
                  material={WallMaterial}
                  position={[0, 1, -length + 2]}
                  scale={[4, 2, 0.2]}
                  castShadow
                  receiveShadow
            />
            <CuboidCollider args={[2, 0.1, length * 0.5]} position={[0, -0.1, -length * 0.5 + 2]} friction={1}/>
        </RigidBody>
    </>
}