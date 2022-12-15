import React, { useEffect, useState } from 'react';
import { matrixResolver } from './matrixResolver';
import styled from "styled-components";

const MainContainer = styled.div`
  height: calc(100% - 380px);
  overflow: auto;
  padding: 20px;
  align-items: center;
`;

const Letter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  height: 32px;
  width: 32px;
  font-size: 1rem !important;
  background-color: #eeeeee;
  border-radius: 8px;
  color: #2d4059;
  &.checked {
    color: #eeeeee;
    background-color: #ff5722;
  }
`

const MatrixGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: fit-content;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const formatMatrix = (matrix, match, setCount, setFormatedMatrix) => {
  const newFormatedMatrix = [];
  const resolution = matrixResolver(matrix, match.toUpperCase());
  setCount(resolution.matchs);
  for (let y = 0; y < matrix.length; y++) {
    const newFormatedRow = [];
    for (let x = 0; x < matrix[y].length; x++) {
      const currentPosition = JSON.stringify([x, y]);
      const currentLength = newFormatedRow.length;
      const letter = matrix[y][x];
      resolution.positions.forEach((array) => {
        const position = JSON.stringify(array);
        if (currentPosition === position) {
          newFormatedRow.push(Object.assign({}, { value: letter, checked: true }));
        }
      });
      if (currentLength < newFormatedRow.length) {
        continue;
      }
      newFormatedRow.push(Object.assign({}, { value: letter, checked: false }));
    }
    newFormatedMatrix.push(newFormatedRow);
  }
  setFormatedMatrix(newFormatedMatrix);
}

export default function Matrix({ count, setCount, matrix, match }) {
  const [formatedMatrix, setFormatedMatrix] = useState([]);

  useEffect(() => {
    Array.isArray(matrix) && formatMatrix(matrix, match, setCount, setFormatedMatrix);
  }, [match, matrix, setCount, setFormatedMatrix]);

  if (matrix.length) {
    return (
      <MainContainer>
        <MatrixGroup>
          {
            formatedMatrix.map((row, index) => (
              <Row key={index}>
                {
                  row.map((letter, index) => {
                    return (
                      <Letter className={letter.checked && 'checked'} key={index}>
                        <strong>{letter.value}</strong>
                      </Letter>
                    )
                  })
                }
              </Row>
            ))}
        </MatrixGroup>
      </MainContainer>
    );
  } else {
    return (
      <MainContainer>
      </MainContainer>
    );
  }
}
