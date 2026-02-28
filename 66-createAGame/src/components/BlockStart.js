import floor1Material from "../objects/Floor1Material.js";
import Floor from "./Floor.js";

export default function BlockStart({position = [0, 0, 0]}) {
    return <Floor position={position} texture={floor1Material}/>
}