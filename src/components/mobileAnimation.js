import React, { useEffect, useState } from "react";
import LottieAnimation from "./lottieAnimation";
import cx from 'classnames';
import './mobileAnimation.css';
import './animations.css';

const TIMERS = {
  'START_TO_DELIVER': 5,
  'DELIVER_TO_DELIVERED': 3,
  'DELIVERED_TO_FIELD': [3, 4, 5, 6, 7],
  'FIELD_TO_DELIVER': [3, 4, 5, 6, 7],
  'DELIVER_TO_START': [5],
  'LOTTIE_ANIMATION': [5]
}

const MobileAnimation = (props) => {
  const { waitingForBall, labelClass, animationDetails, animation } = props;
  const { isLeft, distance } = animationDetails || {}; 
  const [currentBallState, setCurrentBallState] = useState('start');
  const [currentBowlerState, setCurrentBowlerState] = useState('start');
  const [playLottie, setPlayLottie] = useState(false);
  const [transition, setTransition] = useState(0);


  useEffect(() => {
    if (labelClass && animationDetails) {
      console.log("starting animation props", props)
      setTransition(TIMERS.START_TO_DELIVER)
      startToDeliver()
    }
  }, [labelClass])

  useEffect(() => {
    console.log(currentBallState)
  }, [currentBallState])

  useEffect(() => {
    console.log("transiton time", transition)
  }, [transition])

  const startToDeliver = () => {
    setCurrentBallState('deliver');
    setCurrentBowlerState('deliver');
    setTimeout(() => {
      setTransition(TIMERS.DELIVER_TO_DELIVERED)
      deliverToDelivered()
    }, TIMERS.START_TO_DELIVER * 1000)
  }

  const deliverToDelivered = () => {
    setCurrentBallState('delivered');
    setTimeout(() => {
      setTransition(TIMERS.DELIVERED_TO_FIELD[distance - 1])
      deliveredToHit()
    }, TIMERS.DELIVER_TO_DELIVERED * 1000)
  }

  const deliveredToHit = () => {
    setCurrentBallState(labelClass);
    setTimeout(() => {
      hitToDeliverBack()
    }, TIMERS.DELIVERED_TO_FIELD[distance - 1] * 1000)
  }

  const hitToDeliverBack = () => {
    setCurrentBallState('deliver');
    setTimeout(() => {
      setTransition(TIMERS.START_TO_DELIVER)
      deliverToStart()
    }, TIMERS.FIELD_TO_DELIVER[distance - 1] * 1000)
  }

  const deliverToStart = () => {
    setCurrentBallState("start");
    setCurrentBowlerState('start')
    setTimeout(() => { 
      startLottie()
     }, TIMERS.START_TO_DELIVER * 1000)
  }

  const startLottie = () => {
    console.log("start lottie animations")
    setPlayLottie(true)
    setTimeout(() => {
      setPlayLottie(false);
      console.log("stop lottie animations")
      props.playNext()
    }, TIMERS.LOTTIE_ANIMATION * 1000)
  }

  return (
    <>
      <div className="mobileMockup">
        <div className="boundedMobile">
          <div className={cx("boundedWagonWheel", { 'left': isLeft })}>
            <div className="pitch">
              <img src={require("../static/groundBgNew.jpg")} alt="ground" className={cx("graoundImg", { 'left': isLeft })} />
              <div className={cx("ball ", currentBallState)} style={{ transitionDuration: `${transition}s` }}>
                <img src={require("../static/ballNew.png")} alt="ball" />
              </div>
              <div className="stump">
                <img src={require("../static/stumps.png")} alt="stump" />
              </div>
              <div className="stumpNon">
                <img src={require("../static/stumps.png")} alt="stump" />
              </div>
              <div className={cx("bowler", currentBowlerState)} style={{ transitionDuration: "5s" }}>
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
          {!!playLottie ? (<div className="lottieAnim">
            <LottieAnimation animation={animation} playLottie={playLottie}/>
          </div>) : ''}
        </div>
      </div>
    </>
  );
};

export default MobileAnimation;
