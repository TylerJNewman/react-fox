import React, {Suspense} from "react";
import {Canvas} from "react-three-fiber";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RecoilRoot} from "recoil";
import "./styles.css";
import Loading from "./Loading";
import Terrain from "./Terrain";
import Ship from "./Ship";
// import CameraControls from "./CameraControls";
import Target from "./Target";
import Enemies from "./Enemies";
import LaserController from "./LaserController";
import Lasers from "./Lasers";
import GameTimer from "./GameTimer";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
// extend({OrbitControls});

export default function App() {
  return (
    <Canvas style={{background: "black"}}>
      <RecoilRoot>
        <directionalLight intensity={1} />
        <ambientLight intensity={0.1} />
        <Terrain />
        <Suspense fallback={<Loading />}>
          <Ship />
        </Suspense>
        <Target />
        <Enemies />
        <Lasers />
        <LaserController />
        <GameTimer />
      </RecoilRoot>
    </Canvas>
  );
}
