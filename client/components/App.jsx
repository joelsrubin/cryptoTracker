import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';

export default function App() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [data, setData] = useState([]);

  const searchApi = () => {
    axios.get(`http://3.133.82.213/api/${start}/${end}`).then((results) => {
      setData(formatData(results.data.bpi));
    });
  };

  const formatData = (results) => {
    let result = [{ id: 'bitcoin', data: [] }];
    let keys = Object.keys(results);
    let values = Object.values(results);
    for (let i = 0; i < keys.length; i++) {
      let obj = { x: null, y: null };
      obj.x = keys[i];
      obj.y = values[i];
      result[0].data.push(obj);
    }
    return result;
  };

  console.log(data);

  return (
    <div>
      <Header>
        <div>
          <Title>The Crypto Keepr</Title>
        </div>
      </Header>
      <Container>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=' >-.2f'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Container>
      <CalContainer>
        <div>
          <label>start date </label>
          <input
            onChange={(e) => {
              setStart(e.target.value);
            }}
            type='date'
          ></input>
        </div>
        <div>
          <label>end date </label>
          <input
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            type='date'
          ></input>
          <button onClick={searchApi}>submit</button>
        </div>
      </CalContainer>
    </div>
  );
}

const Container = styled.div`
  height: 500px;
  width: 1000px;
  border: 1px solid black;
  margin: auto;
  margin-top: 10px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const CalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Title = styled.span`
  font-size: 26;
  font-family: 'menlo';
  text-align: center;
`;
