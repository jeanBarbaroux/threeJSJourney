export default function Cube({scale}) {
    return <mesh position-x={2} scale={scale}>
        <boxGeometry/>
        <meshStandardMaterial color="mediumpurple"/>
    </mesh>
}