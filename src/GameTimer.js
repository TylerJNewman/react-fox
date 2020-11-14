import {useFrame} from "react-three-fiber";
import {useRecoilState} from "recoil";
import {enemyPositionState, laserPositionState, scoreState} from "./gameState";
import {
  LASER_RANGE,
  LASER_Z_VELOCITY,
  ENEMY_SPEED,
  GROUND_HEIGHT,
} from "./config";
import {distance} from "./util";

// This component runs game logic on each frame draw to update game state.
export default function GameTimer() {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  const [score, setScore] = useRecoilState(scoreState);

  useFrame(({mouse}) => {
    // Map through all of the enemies in state. Detect if each enemy is within one unit of a laser if they are set that place in the return array to true.
    // The result will be an array where each index is either a hit enemy or an unhit enemy.
    const hitEnemies = enemies
      ? enemies.map(
          (enemy) =>
            lasers.filter(
              (laser) =>
                lasers.filter((laser) => distance(laser, enemy) < 3).length > 0
            ).length > 0
        )
      : [];

    if (hitEnemies.includes(true) && enemies.length > 0) {
      setScore(score + hitEnemies.filter((hit) => hit).length);
      console.log("hit detected");
    }
    // Move all of the enemies. Remove enemies that have been destroyed, or that have passed the player.
    setEnemies(
      enemies
        .map((enemy) => ({x: enemy.x, y: enemy.y, z: enemy.z + ENEMY_SPEED}))
        .filter((enemy, idx) => !hitEnemies[idx] && enemy.z < 0)
    );

    // Move the Lasers and remove lasers at end of range or that have hit the ground.
    setLaserPositions(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          z: laser.z - LASER_Z_VELOCITY,
          velocity: laser.velocity,
        }))
        .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    );
  });
  return null;
}
