import React, { useState, useEffect, useMemo } from 'react';
import styled from "styled-components";

import {
  generateMatrix,
  debounce,
  placeholderString,
  placeholderSearch,
} from './utils';
import Matrix from './components/Matrix';

const Main = styled.div`
  height: 100%;
  display: flex;
  background-color: #222831;
  text-transform: uppercase;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h1 {
    margin: 30px 30px 0 30px;
  }
`;

const MatchesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: bold;
  grid-column-start: 2;
  grid-column-end: 4;
`;

const Settings = styled.div`
  display: grid;
  grid-template-columns: calc(100% - 410px) 200px 150px;
  gap: 22px;
  padding: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  &.matrix-input {
    grid-row-start: 1;
    grid-row-end: 3;
  }

  label {
    font-size: 24px;
    margin-bottom: 8px;
  }

  input, textarea {
    outline: none;
    padding: 7px 0 7px 14px;
    border: 3px solid rgb(150, 150, 150);
    box-shadow: 0px 0px 0px 1px rgb(90, 90, 90),
      inset 0px 0px 0px 1px rgb(90, 90, 90),
      1px 2px 0px 2px rgb(100, 100, 100);
    border-radius: 0.3em;
    color: rgb(50, 50, 50);
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1.3em;

    .matrix-input {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }

  textarea {
    height: 100%;
  }

  textarea:focus, input:focus {
    box-shadow: 0px 0px 0px 1px #ff5722,
      inset 0px 0px 0px 1px rgb(60, 60, 60),
      1px 2px 0px 1px #ff5722;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

const ResolutionWrapper = styled.div`
  flex-direction: column;
  width: 100%;
`;

function App() {
  const [rows, setRows] = useState(12);
  const [matrixString, setMatrixString] = useState(placeholderString);
  const [matrix, setMatrix] = useState([]);
  const [search, setSearch] = useState(placeholderSearch);
  const [count, setCount] = useState(0);

  const debouncedMatrixCreate = useMemo(
    () => debounce(() => {
      const newMatrix = generateMatrix(matrixString, rows);
      setMatrix(newMatrix);
    }, 800)
  , [matrixString, rows]);

  useEffect(
    () =>  {
      if (rows > 0 && matrixString.length > 0) return debouncedMatrixCreate();
      else {
        setMatrix([]);
      }
    },
    [rows, matrixString, debouncedMatrixCreate],
  );

  return (
    <Main>
      <ResolutionWrapper>
        <Description>
          <h1>
            Transform the text you want to a Matrix, yo can select the number of rows and search matches between blocks. Get fun!
          </h1>
        </Description>
        <Settings>
          <InputContainer className='matrix-input'>
            <label htmlFor="matrix">
              <strong>Matrix</strong>
            </label>
            <textarea
              name='matrix'
              onChange={({ target }) => setMatrixString(target.value)}
              value={matrixString}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="match">
              <strong>Search</strong>
            </label>
            <input
              name='search'
              onChange={({ target }) => setSearch(target.value)}
              value={search}
            />
          </InputContainer>
          <InputContainer className='rows-input'>
            <label htmlFor="rows">
              <strong>Rows</strong>
            </label>
            <input
              type="number"
              name="rows"
              onChange={({ target }) => setRows(target.value)}
              value={rows}
              max={matrixString.length}
            />
          </InputContainer>
          <MatchesContainer>
            <p>
              {`${count} ${count.length === 1 ? 'Match' : 'Matches'}`}
            </p>
          </MatchesContainer>
        </Settings>
        <Matrix matrix={matrix} match={search} setCount={setCount}/>
      </ResolutionWrapper>
    </Main>
  );
}

export default App;
