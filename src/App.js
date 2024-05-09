import React, { useState, useEffect } from 'react';
import './App.css';

const routes = {
  "01A": ["Alpha", "Bravo", "Charlie", "Echo", "Golf"],
  "02B": ["Alpha", "Delta", "Echo", "Foxtrot", "Golf"],
  "03C": ["Charlie", "Delta", "Foxtrot", "Hotel", "India"],
  "04A": ["Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
  "04D": ["Charlie", "Echo", "Foxtrot", "Golf", "India"],
  "06B": ["Delta", "Hotel", "Juliet", "Kilo", "Lima"],
  "06D": ["Delta", "Foxtrot", "Golf", "India", "Kilo"],
  "10C": ["Foxtrot", "Golf", "Hotel", "India", "Juliet"],
  "10H": ["Foxtrot", "Hotel", "Juliet", "Lima", "November"],
  "11A": ["Foxtrot", "Golf", "Kilo", "Mike", "November"],
  "11B": ["Foxtrot", "Golf", "Lima", "Oscar", "Papa"],
  "20A": ["India", "Juliet", "November", "Papa", "Romeo"],
  "20C": ["India", "Kilo", "Lima", "Mike", "Romeo"],
  "42C": ["Juliet", "Kilo", "Lima", "Mike", "Oscar"],
  "42D": ["Juliet", "November", "Oscar", "Quebec", "Romeo"]
};

const App = () => {
  const [jeepCode, setJeepCode] = useState('');
  const [outputList, setOutputList] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    console.log(colorMap);
  }, [colorMap]);

  const updatejeepCode = (e) => {
    setJeepCode(e.target.value);
    setOutputList([]);
    setColorMap({})
  };
  
  const assignColorMap = (key, value) => {
    setColorMap(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const keyExists = (key) => {
    return colorMap.hasOwnProperty(key);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jeepCodes = jeepCode.split(',').map(code => code.trim());
    if (validateJeepCode(jeepCodes)) {
      const resultText = createOutput(jeepCodes);
      console.log(colorMap)
      setOutputList(prevOutputs => [...prevOutputs, resultText]);
      setJeepCode('');
    } else {
      alert('Invalid Jeep Codes, Add another!.');
    }
  };

  const validateJeepCode = () => {
    const pattern = /^\d{2}[A-Z](,\d{2}[A-Z])*$/;
    return pattern.test(jeepCode);
  };

  const randomizedNeonColor = () => {
    const randColors = [
      "#00FF00",
      "#00FFFF", 
      "#FF00FF", 
      "#FF0000 ", 
      "#FF1493",
      "#9933ff",
      "#ff4d4d"
    ];
    
    return randColors[Math.floor(Math.random() * randColors.length)];
};

  const createOutput = (jeepCodes) => {
    let resultText = '';
    let placeColors = {}; 
  
    for (let codeIndex = 0; codeIndex < jeepCodes.length; codeIndex++) {
      const code = jeepCodes[codeIndex];
      if (routes[code]) {
        resultText += `${code} => `;
        const places = routes[code];
        for (let i = 0; i < places.length; i++) {
          const place = places[i];
          let placeColor = placeColors[place]; 
          if (!placeColor) { 
            if (keyExists(place)) {
              placeColor = colorMap[place];
            } else {
              let newColor = "black";
              for (let j = 0; j < jeepCodes.length; j++) {
                if (jeepCodes[j] !== code && routes[jeepCodes[j]].includes(place)) {
                  newColor = randomizedNeonColor();
                } 
              }
              assignColorMap(place, newColor);
              placeColor = newColor;
            }
            placeColors[place] = placeColor;
          }
          resultText += `<span style="color: ${placeColor}">${place}</span>`;
          if (i !== places.length - 1) resultText += ' <-> ';
        }
        if (codeIndex !== jeepCodes.length - 1) resultText += ', ';
      }
    }
    return resultText;
  };
  
  return (
    <div>
    <h1>FIND YOUR JEEP ROUTE!</h1>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="jeepCodeInput">Add Jeep Code:</label>
        <br />
        <input id="jeepCodeInput" type="text" value={jeepCode} onChange={updatejeepCode} />
        <br />
        <button type="submit">Check</button>
      </form>
      <div className="output" dangerouslySetInnerHTML={{ __html: outputList.join(', ') }} />
    </div>
  </div>
  );
  
};

export default App;