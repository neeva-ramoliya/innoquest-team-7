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
      
      </div>
    </>
  );
};

export default Scorecard;
