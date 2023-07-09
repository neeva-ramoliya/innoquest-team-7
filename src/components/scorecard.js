import React, { useEffect, useState } from "react";
import MobileAnimation from "./mobileAnimation";
import "./scorecard.css";

const Scorecard = (data) => {
  const [commentaryData, setCommentaryData] = useState();
  const onSubmitHandler = (event) => {
    setCommentaryData(JSON.parse(event.target.commentary_data.value));
    event.preventDefault();
  };

  useEffect(() => {
    console.log(commentaryData)
  }, [commentaryData])

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
        {/* <div className="commentary-input">
          <form onSubmit={onSubmitHandler}>
            <label>Enter input </label>
            <br />
            <textarea name="commentary_data" rows="9" />
            <br />
            <input type="submit" />
          </form>
        </div> */}
      </div>
    </>
  );
};

export default Scorecard;
