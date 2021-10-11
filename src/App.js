import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef} from 'react';
import * as pose from  '@tensorflow-models/posenet';
import * as webgl from  '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import react from 'react';


function App() {

  const loadPosenet = async (configs) => {
    // console.log('config', configs)
    console.log('pose', pose)
    console.log('pose.load', pose.load)
    return pose.load(configs);
  }

  const webcamRef = useRef();

  const [model, setModel] = useState();

  useEffect( () => {
    console.log('loadPosenet', loadPosenet())
    const wrapper = async (configs) => await loadPosenet(configs);
    const poseEstimator = wrapper({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: { width: 800, height: 600 },
      multiplier: 0.75
    });
    // const loadedPose = await loadPosenet.load({
    //   architecture: 'MobileNetV1',
    //   outputStride: 16,
    //   inputResolution: { width: 800, height: 600 },
    //   multiplier: 0.75
    // });

    setModel(poseEstimator);
    console.log('Posenet Model Loaded..', poseEstimator)

  }, [])


  return (
    <div className="App">
      <header className="App-header" style={
        {position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 9}}>
          <Webcam
            ref={webcamRef}
            width={800}
            height={600}
          >


          </Webcam>

      </header>
    </div>
  );
}

export default App;
