import React, { useEffect, useState } from 'react';
import { formatMatrix } from '../../utils';
import styled from "styled-components";

const MainContainer = styled.div`
  height: calc(100% - 400px);
  width: calc(100% - 60px);
  overflow: auto;
  padding: 30px;
  align-items: center;
  display: grid;
  grid-template-rows: repeat(${
    props => props.rows ? props.rows : 1
  }, 42px);
  grid-template-columns: repeat(${
    props => props.columns ? props.columns : 1
  }, 42px);
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

export default function Matrix({ setCount, matrix, match }) {
  const [formatedMatrix, setFormatedMatrix] = useState([]);

  useEffect(() => {
    if(Array.isArray(matrix)) formatMatrix(matrix, match, setCount, setFormatedMatrix);
  }, [match, matrix, setCount, setFormatedMatrix]);

  console.log({ formatedMatrix });
  return (formatedMatrix.length > 0) ? ((
    <MainContainer rows={formatedMatrix.length} columns={formatedMatrix[0]?.length || 0}>
      {
        formatedMatrix.map((row, rowIndex) => (
            row.map((letter, colIndex) => {
              return (
                <Letter
                  key={`letter-${letter.value}-row${rowIndex}-col${colIndex}`}
                  className={letter.checked && 'checked'}
                >
                    <strong>{letter.value}</strong>
                </Letter>
              )
            })
        ))
      }
    </MainContainer>
  )) : null;
}
