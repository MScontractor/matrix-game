const emptyPosition = ' ';

export function generateMatrix(string, rows) {
    if (string.length === 0) return [];
    const dif = string.length % rows;
    const compensationString = Array(rows - dif).fill(emptyPosition).join('');
    const completedString = string.concat(compensationString).toUpperCase()
    const len = completedString.length / rows;
    const creds = completedString.split("").reduce((acc, val) => {
      let { res, currInd } = acc;
      if (!res[currInd] || res[currInd].length < len){
        res[currInd] = (res[currInd] || "") + val;
      } else {
        res[++currInd] = val;
      };
      return { res, currInd };
    }, {
       res: [],
       currInd: 0
    });
    return creds.res.map((res) => res.split(''));
}


export function matrixResolver(matrix, match) {
    let checkedPositions = [];
    let matchCount = 0;
    if (!!matrix) {
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          const initialLetter = matrix[y][x];
          let currentLetter = matrix[y][x];
          const matrixSize = [matrix[y].length, matrix.length];
          const wordLenght = match.length;
          if (wordLenght === 1) {
            if (initialLetter === match) {
              checkedPositions.push([x, y]);
              matchCount++;
              continue;
            } else {
              continue;
            }
          }
          const matchArray = match.split('');
          const matchArrayReverse = match.split('').reverse();
          for (let orientation in checkOrientations) {
            const { fit, move } = checkOrientations[orientation](
              x,
              y,
              matrixSize[1],
              matrixSize[0],
              wordLenght
            );
            if (fit) {
              let targetsPosition = [];
              let subArray = [];
              const isTail = initialLetter === matchArrayReverse[0];
              const isNose = initialLetter === matchArray[0];
              if (isNose || isTail) {
                targetsPosition.push([x, y]);
                subArray.push(initialLetter);
                let dinamicPosition = [x, y];
                for (let i = 0; i < (wordLenght - 1); i++) {
                  dinamicPosition = dinamicPosition.map((num, idx) => (
                    num + move[idx]
                  ));
                  currentLetter = matrix[dinamicPosition[1]][dinamicPosition[0]];
                  if (currentLetter === matchArray[i + 1]) {
                    subArray.push(currentLetter);
                    targetsPosition.push(dinamicPosition);
                  };
                };
                const subString = subArray.join('')
                const reg = new RegExp(match, 'g');
                if ((subString.match(reg) || []).length) {
                  matchCount++;
                  checkedPositions = checkedPositions.concat(targetsPosition);
                }
              }
            };
          }
        }
      }
      const uniquePositions = Array.from(new Set(checkedPositions.map(JSON.stringify)), JSON.parse);
      return { matchs: matchCount, positions: uniquePositions };
    } else {
      console.error('matrix is undefined');
    };
  };
  
  const checkOrientations = {
    horizontal: (x, y, h, w, l) => ({ fit: w >= (x + l), move: [1, 0] }),
    horizontalBack: (x, y, h, w, l) => ({ fit: (x + 1) >= l, move: [-1, 0] }),
    vertical: (x, y, h, w, l) => ({ fit: h >= (y + l), move: [0, 1] }),
    verticalUp: (x, y, h, w, l) => ({ fit: (y + 1) >= l, move: [0, -1] }),
    diagonal: (x, y, h, w, l) => ({ fit: (w >= (x + l)) && (h >= (y + l)), move: [1, 1] }),
    diagonalBack: (x, y, h, w, l) => ({ fit: ((x + 1) >= l) && (h >= (y + l)), move: [-1, 1] }),
    diagonalUp: (x, y, h, w, l) => ({ fit: (w >= (x + l)) && ((y + 1) >= l), move: [1, -1] }),
    diagonalUpBack: (x, y, h, w, l) => ({ fit: ((x + 1) >= l) && ((y + 1) >= l), move: [-1, -1] })
  };