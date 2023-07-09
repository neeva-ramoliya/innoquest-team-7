import React, { useEffect, useState } from "react";
import MobileAnimation from "./mobileAnimation";
import "./scorecard.css";

const Scorecard = (data) => {
  const [commentaryData, setCommentaryData] = useState();
  const onSubmitHandler = (event) => {
    setCommentaryData(JSON.parse(event.target.commentary_data.value));
    event.preventDefault();
  };

  const getData = async () => {
    const data = {
      'commentary': 'commentary'
    };
    
    fetch('http://localhost:8000/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from Flask API:', data);
        // Handle the response data here
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the request
      });
    
   }
  useEffect(() => {
   getData()
  }, [])

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
