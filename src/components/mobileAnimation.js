import React, { useState } from "react";
import './mobileAnimation.css';
import './animations.css';

const MobileAnimation = (data) => {


  return (
    <>
      <div className="mobileMockup">
        <div className="boundedMobile">
          <div className="boundedWagonWheel">
            <div class="pitch">
              <img src={require("../static/groundBgNew.jpg")} alt="ground" />
              <div class="ball">
                <img src={require("../static/ballNew.png")} alt="ball" />
              </div>
              <div class="bat">
                <img src={require("../static/batsman.png")} alt="ball" />
              </div>
            </div>
          </div>
          <div className="boundedAnimation">
            <img src={require("../static/Umpire/1Run.gif")} alt="bowler" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileAnimation;
