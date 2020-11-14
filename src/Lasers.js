import React from "react";
import {useRecoilValue} from "recoil";
import {laserPositionState} from "./gameState";

// Draws all of the lasers existing in state.
// export default function Lasers() {
//   const lasers = useRecoilValue(laserPositionState);
//   React.useEffect(() => {
//     if (lasers.length) console.log(lasers[lasers.length - 1]);
//   }, [lasers]);
//   return (
//     <group>
//       {lasers.map((laser) => (
//         <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
//           <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//           <meshStandardMaterial attach="material" emissive="white" wireframe />
//         </mesh>
//       ))}
//     </group>
//   );
// }

export default function Lasers() {
  const lasers = useRecoilValue(laserPositionState);
  return (
    <group>
      {lasers.map((laser) => (
        <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" emissive="white" wireframe />
        </mesh>
      ))}
    </group>
  );
}
