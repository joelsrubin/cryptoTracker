import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [data, setData] = useState([]);

  const searchApi = () => {
    axios.get(`/api/${start}/${end}`).then((results) => {
      setData(results);
    });
  };

  console.log(data);

  return (
    <div>
      <div>
        <label>start date</label>
        <input
          onChange={(e) => {
            setStart(e.target.value);
          }}
          type='date'
        ></input>
      </div>
      <div>
        <label>end date</label>
        <input
          onChange={(e) => {
            setEnd(e.target.value);
          }}
          type='date'
        ></input>
        <button onClick={searchApi}>submit</button>
      </div>
    </div>
  );
}
