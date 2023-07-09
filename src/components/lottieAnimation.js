import React from "react";
import Lottie from "lottie-react";
import outAnimation from "../static/lottie-json/out.json";
import wideAnimation from "../static/lottie-json/wideball.json";
import noBallAnimation from "../static/lottie-json/noball.json";
import dotBallAnimation from "../static/lottie-json/dotball.json";
import oneRunAnimation from "../static/lottie-json/1run.json";
import twoRunAnimation from "../static/lottie-json/2run.json";
import threeRunAnimation from "../static/lottie-json/3runs.json";
import fourRunAnimation from "../static/lottie-json/four.json";
import sixRunAnimation from "../static/lottie-json/six.json";

const LottieAnimation = (props) => {

  if (!props.animation) {
    return <></>
  }

  const getAnimation = () => {
    switch (props.animation) {
      case 'ANIMATION_OUT':
        return outAnimation;
      case 'ANIMATION_WIDE':
        return wideAnimation;
      case 'ANIMATION_NOBALL':
        return noBallAnimation;
      case 'ANIMATION_SIX':
        return sixRunAnimation;
      case 'ANIMATION_FOUR':
        return fourRunAnimation;
      case 'ANIMATION_THREE':
        return threeRunAnimation;
      case 'ANIMATION_TWO':
        return twoRunAnimation;
      case 'ANIMATION_ONE':
        return oneRunAnimation;
      case 'ANIMATION_NO_RUN':
        return dotBallAnimation
    }
  }

  return (
    <Lottie animationData={getAnimation()} loop={true} />
  );
};

export default LottieAnimation;