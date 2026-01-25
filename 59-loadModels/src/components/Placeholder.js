export default function Placeholder(props) {
    return <>
        <mesh position-y={props.position} scale={props.scale}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]}/>
            <meshStandardMaterial color={props.color} wireframe/>
        </mesh>
    </>
}