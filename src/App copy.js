import logo from './logo.svg';
import React, {useEffect} from 'react'
import './App.css';

function App() {

  const getData = async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
