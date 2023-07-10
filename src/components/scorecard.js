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
  const [animationDetails, setAnimationDetails] = useState(null);
  const [scoreBoard, setScoreBoard] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    console.log("update fieldingPosition", fieldingPosition)
  }, [fieldingPosition])

  useEffect(() => {
    console.log("update animationDetails", animationDetails)
  }, [animationDetails])

  useEffect(() => {
    console.log("update index", index)
  }, [index])

  const startAnimation = (idx) => {
    let data = commentaryData.Commentary;
    if (idx >= data.length) {
      setWaitingForBall(true);
      return;
    }
    if (!data[idx].Isball) {
      setWaitingForBall(true);
    } else {
      getData(data[idx].Commentary, data[idx].Default_Commentary, idx);
      setMatchDetails({
        score: data[idx].Score,
        over: data[idx].Over,
        batsman: data[idx].Batsman_Name,
        bowler: data[idx].Bowler_Name,
      });
    }
  };

  const playNext = () => {
    setScore(commentaryData.Commentary[index]['Score'])
    setFieldingPosition(null);
    setAnimationDetails(null);
    setIndex(index + 1);
    startAnimation(index + 1);
  };

  const updateFieldingPosition = (data, idx) => {
    const { ball_position, result } = data;
    const ballData = commentaryData.Commentary[idx]
    let posCls = getFieldingPositionClass(ball_position)
    if (!posCls) {
      posCls = getClassByZoneData(ballData['ZAD'])
    }

    if (!posCls) posCls = 'played';
    
    console.log("updating animation data", ballData)
    setAnimationDetails({
      isLeft: ballData['Batsman_Style'] == "L",
      runs: parseInt(ballData['Batsman_Runs']),
      distance: getDistance(ballData['ZAD']),
      Wide: isWide(result),
      isWicket: ballData["Iswicket"],
      isNoball: isNoball(result)
    });
    setScoreBoard({
      over: ballData['Over'],
      score: ballData['Score'],
      striker: `${ballData['Batsman_Name']} - ${ballData['Batsman_Details']['Runs']}(${ballData['Batsman_Details']['Balls']})`,
      nonStirker: `${ballData['Non_Striker_Name']} - ${ballData['Non_Striker_Details']['Runs']}(${ballData['Non_Striker_Details']['Balls']})`,
      bowler: `${ballData['Bowler_Name']} - ${ballData['Bowler_Details']['Wickets']}/${ballData['Bowler_Details']['Runs']}(${ballData['Bowler_Details']['Overs']})`
    })
    setFieldingPosition(posCls);
  }

  const getData = async (Commentary, Default_Commentary, idx) => {
    const data = {
      Commentary: Commentary,
      Default_Commentary: Default_Commentary,
    };

    console.log("calling api for ", data, idx)
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
        updateFieldingPosition(res.data, idx)
        console.log("Response from Flask API:", res.data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the request
      });
  };
  useEffect(() => {
    if(window.location.search.includes('no=1')) {
      setCommentaryData(DATA.data1);
    } else {
      setCommentaryData(DATA.data2);
    }
    
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
          animationDetails= {animationDetails}
          
          animation={animationDetails && getAnimation(animationDetails)}
          playNext={playNext}
        />
        {/* <MobileAnimation
          waitingForBall={false}
          labelClass={'longOff'}
          isLeft={true}
          runs={3}
          isWide={false}
          isWicket={false}
          distance={3}
          animation={'ANIMATION_THREE'}
          playNext={playNext}
        /> */}
        <div className="boundedScoreboard">
          <div className="team">
            <img src={require("../static/net.png")} />
          </div>
          <div className="teamStat">
            <div className="player">
              <img src={require("../static/bat.png")} />
              {scoreBoard && scoreBoard.striker}
            </div>
            <div className="player">
            {scoreBoard && scoreBoard.nonStirker}
            </div>
          </div>
          <div className="score">
          {score ? score : commentaryData ? commentaryData.Commentary[index]['Score'] : ''}

          </div>
          <div className="teamStat">
            <div className="player">
            {scoreBoard && scoreBoard.bowler}
            </div>
          </div>
          <div className="team">
            <img src={require("../static/oman.gif")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Scorecard;
