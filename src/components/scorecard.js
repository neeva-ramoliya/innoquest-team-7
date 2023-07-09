import React, { useEffect, useState } from "react";
import MobileAnimation from "./mobileAnimation";
import "./scorecard.css";
import * as DATA from "../data/data";
import { getClassByZoneData, getFieldingPositionClass, getDistance, isNoball, isWide, getAnimation} from '../utils';


const Scorecard = (data) => {
  const [commentaryData, setCommentaryData] = useState();
  const [waitingForBall, setWaitingForBall] = useState();
  const [matchDetails, setMatchDetails] = useState();
  const [fieldingPosition, setFieldingPosition] = useState();
  const [index, setIndex] = useState(0);
  const [animationDetails, setAnimationDetails] = useState();

  useEffect(() => {
    console.log("update fieldingPosition", fieldingPosition)
  }, [fieldingPosition])

  const startAnimation = (idx) => {
    let data = commentaryData.Commentary;
    if (idx >= data.length) {
      setWaitingForBall(true);
      return;
    }
    if (!data[idx].Isball) {
      setWaitingForBall(true);
    } else {
      getData(data[idx].Commentary, data[idx].Default_Commentary);
      setMatchDetails({
        score: data[idx].Score,
        over: data[idx].Over,
        batsman: data[idx].Batsman_Name,
        bowler: data[idx].Bowler_Name,
      });
    }
  };

  const playNext = () => {
    setFieldingPosition(null);
    setIndex(index + 1);
    startAnimation(index + 1);
  };

  const updateFieldingPosition = (data) => {
    const { ball_position, result } = data;
    const ballData = commentaryData.Commentary[index]
    let posCls = getFieldingPositionClass(ball_position)
    if (!posCls) {
      posCls = getClassByZoneData(ballData['ZAD'])
    }

    if (!posCls) posCls = 'played';
    
    setAnimationDetails({
      isLeft: ballData['Batsman_Style'] == "L",
      runs: parseInt(ballData['Batsman_Runs']),
      distance: getDistance(ballData['ZAD']),
      Wide: isWide(result),
      isWicket: ballData["Iswicket"],
      isNoball: isNoball(result)
    });
    setFieldingPosition(posCls);
  }

  const getData = async (Commentary, Default_Commentary) => {
    const data = {
      Commentary: Commentary,
      Default_Commentary: Default_Commentary,
    };

    console.log("calling api for ", data)
    fetch("http://localhost:8000/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        return response.json();
      })
      .then((res) => {
        updateFieldingPosition(res.data)
        console.log("Response from Flask API:", res.data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the request
      });
  };
  useEffect(() => {
    setCommentaryData(DATA.data1);
  }, []);

  useEffect(() => {
    if (commentaryData) {
      setIndex(0)
      startAnimation(0);
    }
  }, [commentaryData]);

  return (
    <>
      <div></div>
      <div className="scorecard_container">
        <div className="mecHeader">
          <div>
            <img src={require("../static/mecLogo.png")} alt="logo" />
          </div>
        </div>
        <MobileAnimation
          waitingForBall={waitingForBall}
          labelClass={fieldingPosition}
          isLeft={animationDetails ? animationDetails.isLeft : false}
          runs={animationDetails ? animationDetails.runs : null}
          isWide={animationDetails && animationDetails.isWide}
          isWicket={animationDetails && animationDetails.isWicket}
          distance={animationDetails && animationDetails.distance}
          animation={animationDetails && getAnimation(animationDetails)}
          playNext={playNext}
        />
        <div className="boundedScoreboard">

        </div>
      </div>
    </>
  );
};

export default Scorecard;
