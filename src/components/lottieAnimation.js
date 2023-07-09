import React from "react";
import { useLottie } from "lottie-react";
import outAnimation from "../static/lottie-json/out.json";

const LottieAnimation = (props) => {

  const getAnimation = () => {
    return outAnimation;
  }

  const { View } = useLottie({animationData: getAnimation(props.animation), loop: true});

  return <>{View}</>;
};

export default LottieAnimation;