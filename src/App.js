import React, { useState } from 'react';
import styled from "styled-components";

import { generateMatrix } from './components/Matrix/matrixResolver';
import Matrix from './components/Matrix';

const Main = styled.div`
  height: 100%;
  display: flex;
  background-color: #222831;
  height: 100%;
`;

const MatrixContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Settings = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
  margin: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 8px;
  }
  &.matrix-input {
    grid-row-start: 1;
    grid-row-end: 3;
    textarea {
      height: 100%;
    }
  }
  &.rows-input {
    label {
      margin-bottom: 0;
      margin-right: 8px;
    }
    flex-direction: row;
  }
`;

const ResolutionWrapper = styled.div`
  flex-direction: column;
  width: 100%;
`;

const initialString = "Yes, I am a dreamer. For a dreamer is one who can only find his way by moonlight, and his punishment is that he sees the dawn before the rest of the world. Most people are other people. Their thoughts are someone else's opinions, their lives a mimicry, their passions a quotation."

function App() {
  const [rows, setRows] = useState(11);
  const [matrixString, setMatrixString] = useState(initialString);
  const [matrix, setMatrix] = useState([]);
  const [match, setMatch] = useState('hi');

  React.useEffect(() => {
    const newMatrix = generateMatrix(matrixString, rows);
    setMatrix(newMatrix)
  }, [rows, matrixString])

  return (
    <Main>
      <ResolutionWrapper>
        <Description>
          <h1>Matrix Game</h1>
          <strong>
            Transform the text you want to a Matrix, yo can select the number of rows and search matches between blocks. Get fun!
          </strong>
        </Description>
        <Settings>
          <InputContainer>
            <label for="match">
              <strong>Search</strong>
            </label>
            <input
              name='match'
              onChange={({ target }) => setMatch(target.value)}
              value={match}
            />
          </InputContainer>
          <InputContainer className='matrix-input'>
            <label for="matrix">
              <strong>Matrix</strong>
            </label>
            <textarea
              name='matrix'
              onChange={({ target }) => setMatrixString(target.value)}
              maxlength="300"
              value={matrixString}
            />
          </InputContainer>
          <InputContainer className='rows-input'>
            <label for="rows">
              <strong>Rows</strong>
            </label>
            <input
              type="number"
              name="rows"
              value={rows}
              onChange={({ target }) => setRows(target.value || 1)}
              min="1"
              max="15"
            />
          </InputContainer>
        </Settings>
        <MatrixContainer>
          <Matrix matrix={matrix} match={match} />
        </MatrixContainer>
      </ResolutionWrapper>
    </Main>
  );
}

export default App;
