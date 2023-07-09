import React, { useEffect, useState } from "react";
import LottieAnimation from "./lottieAnimation";
import cx from 'classnames';
import './mobileAnimation.css';
import './animations.css';

const MobileAnimation = (props) => {
  const { waitingForBall, labelClass, isLeft, isSix, runs, isFour } = props;
  const [currentBallState, setCurrentBallState] = useState('start');
  const [umpireFadeIn, setUmpireFadeIn] = useState('false');


  useEffect(() => {
    startBowl()
  }, [labelClass])

  useEffect(() => {
    console.log(currentBallState)
  }, [currentBallState])

  const startBowl = () => {
    setCurrentBallState('deliver');
    setTimeout(() => { deliverBall() }, 500)
  }

  const deliverBall = () => {
    setCurrentBallState('delivered');
    setTimeout(() => { hitTheBall() }, isSix || isFour ? 1500 : 1000)
  }

  const hitTheBall = () => {
    setCurrentBallState(labelClass);
    setTimeout(() => { ballBack() }, isSix || isFour ? 1500 : 1000)
  }

  const ballBack = () => {
    setCurrentBallState("start");
    setUmpireFadeIn(true)
    setTimeout(() => { setUmpireFadeIn(false) }, 1500)
  }

  return (
    <>
      <div className="mobileMockup">
        <div className="boundedMobile">
          <div className="boundedWagonWheel">
            <div className="pitch">
              <img src={require("../static/groundBgNew.jpg")} alt="ground" />
              <div className={cx("ball ", currentBallState)} style={{ transitionDuration: "5s" }}>
                <img src={require("../static/ballNew.png")} alt="ball" />
              </div>
              <div className="bowler" style={{ transitionDuration: "5s" }}>
                <img src={require("../static/bowler.png")} alt="bowler" />
              </div>
              <div className="bat">
                <img src={require("../static/batsman.png")} alt="ball" />
              </div>
            </div>
          </div>
          <div className="boundedAnimation">
            <img src={require("../static/Umpire/1Run.gif")} alt="bowler" />
          </div>
          <div>
            {/* <LottieAnimation /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileAnimation;
