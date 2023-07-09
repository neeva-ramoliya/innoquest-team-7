import React, { useEffect, useState } from "react";
import MobileAnimation from "./mobileAnimation";
import "./scorecard.css";
import { data1 } from "../data/data";

const Scorecard = (data) => {
  const [commentaryData, setCommentaryData] = useState();
  const [waitingForBall, setWaitingForBall] = useState();
  const [matchDetails, setMatchDetails] = useState();
  const [fieldingPosition, setFieldingPosition] = useState();
  const [index, setIndex] = useState();

  const onSubmitHandler = (event) => {
    setCommentaryData(data1);
    // setCommentaryData(JSON.parse(event.target.commentary_data.value));
    event.preventDefault();
  };

  const startAnimation = (index) => {
    let data = commentaryData.Commentary;
    setIndex(index);
    if (!data[index].Isball) {
      setWaitingForBall(true);
    } else {
      getData(data[index].Commentary, data[index].Default_Commentary);
      setMatchDetails({
        score: data[index].Score,
        over: data[index].Over,
        batsman: data[index].Batsman_Name,
        bowler: data[index].Bowler_Name,
      });
    }
  };

  const playNext = () => {
    startAnimation(index + 1);
  };

  const getData = async (Commentary, Default_Commentary) => {
    const data = {
      Commentary: Commentary,
      Default_Commentary: Default_Commentary,
    };

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
      .then((data) => {
        console.log("Response from Flask API:", data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the request
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (commentaryData) {
      startAnimation(0);
    }
  }, [commentaryData]);

  return (
    <>
      <div className="scorecard_container">
        <div className="mecHeader">
          <div>
            <img src={require("../static/mecLogo.png")} alt="logo" />
          </div>
        </div>
        <MobileAnimation
          waitingForBall={false}
          labelClass={'longOff'}
          isLeft={true}
          isSix={true}
          runs={6}
          isFour={false}
          isWide={false}
          extraRuns={0}
        />
        <div className="boundedScoreboard">

        </div>
        {matchDetails && (
          <>
            {matchDetails.score}------ {matchDetails.over}--------
            {matchDetails.batsman}--------{matchDetails.bowler}
          </>
        )}
        <MobileAnimation waitingForBall={waitingForBall} playNext={playNext} />
      </div>
    </>
  );
};

export default Scorecard;
