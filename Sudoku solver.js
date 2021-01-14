/* Solution for https://www.codewars.com/kata/5296bc77afba8baa690002d7
"Write a function that will solve a 9x9 Sudoku puzzle.
The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.
The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach."
*/

function sudoku(puzzle) {
  let cache = [];
  let column = [];
  let group = [];
    
  function getColumn(c) {
    return [0,1,2,3,4,5,6,7,8].map(v => puzzle[v][c]);
  }
  
  function getGroup(r, c) {
    if (r < 3) r = 0;
    if (r > 2 && r < 6) r = 3;
    if (r > 5) r = 6;
    
    if (c < 3) c = 0;
    if (c > 2 && c < 6) c = 3;
    if (c > 5) c = 6
        
    let arr = [0,1,2].map(u => [0,1,2].map(v => puzzle[r + u][c + v]));
    return [].concat.apply([], arr);
  }
  
  while (puzzle.toString().includes(0)) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        column = getColumn(col);
        group = getGroup(row, col);
        for (let num = 1; num < 10; num++) {
          if (puzzle[row][col] === 0 && !puzzle[row].includes(num) && !column.includes(num) && !group.includes(num)) {
            cache.push(num);
          }
        }
        if (cache.length === 1) puzzle[row][col] = cache[0];
        cache = [];
      }
    }
  }
  return puzzle;
}
