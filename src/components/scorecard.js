import React, { useState } from "react";
import MobileAnimation from "./mobileAnimation";
import "./scorecard.css";

const Scorecard = (data) => {
  const [commentaryData, setCommentaryData] = useState();
  const onSubmitHandler = (event) => {
    setCommentaryData(JSON.parse(event.target.commentary_data.value));
    event.preventDefault();
  };

  return (
    <>
      <div>Scorecard</div>
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
        <MobileAnimation />
        {commentaryData && (
          <div className="details">
            <div>Over:{commentaryData.Commentary[0].Over}</div>
            <div>
              Batsman Details
              <div>
                {" "}
                Batsman Name:{commentaryData.Commentary[0].Batsman_Name}
              </div>
              <div>
                Runs:{commentaryData.Commentary[0].Batsman_Details.Runs}
              </div>
              <div>
                Balls:{commentaryData.Commentary[0].Batsman_Details.Balls}
              </div>
              <div>
                Fours:{commentaryData.Commentary[0].Batsman_Details.Fours}
              </div>
              <div>
                Sixes:{commentaryData.Commentary[0].Batsman_Details.Sixes}
              </div>
            </div>
            <div>
              Non Striker Details
              <div>
                Non Striker Name:{commentaryData.Commentary[0].Non_Striker_Name}
              </div>
              <div>
                Runs:{commentaryData.Commentary[0].Non_Striker_Details.Runs}
              </div>
              <div>
                Balls:{commentaryData.Commentary[0].Non_Striker_Details.Balls}
              </div>
              <div>
                Fours:{commentaryData.Commentary[0].Non_Striker_Details.Fours}
              </div>
              <div>
                Sixes:{commentaryData.Commentary[0].Non_Striker_Details.Sixes}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Scorecard;
