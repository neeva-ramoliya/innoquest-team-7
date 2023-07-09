import React, { useEffect, useState } from "react";
import MobileAnimation from "./mobileAnimation";
import "./scorecard.css";
import { data1 } from "../data/data";

const Scorecard = (data) => {
  const [commentaryData, setCommentaryData] = useState();
  const [waitingForBall, setWaitingForBall] = useState();
  const [matchDetails, setMatchDetails] = useState();

  const onSubmitHandler = (event) => {
    setCommentaryData(data1);
    // setCommentaryData(JSON.parse(event.target.commentary_data.value));
    event.preventDefault();
  };

  const startAnimation = () => {
    let data = commentaryData.Commentary;

    for (let index = 0; index < data.length; index++) {
      (function (i) {
        setTimeout(function () {
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
        }, 1000 * index);
      })(index);
    }
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
      startAnimation();
    }
  }, [commentaryData]);

  return (
    <>
      <div className="scorecard_container">
        <div className="commentary-input">
          <form onSubmit={onSubmitHandler}>
            <label>Enter input </label>
            <br />
            <textarea name="commentary_data" rows="9" />
            <br />
            <input type="submit" />
          </form>
        </div>
        {matchDetails && (
          <>
            {matchDetails.score}------ {matchDetails.over}--------
            {matchDetails.batsman}--------{matchDetails.bowler}
          </>
        )}
        <MobileAnimation />
      </div>
    </>
  );
};

export default Scorecard;
