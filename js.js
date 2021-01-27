var MED_ROWS = 15;
var MED_COLS = 15;

function createGrid()
{
  var board = new Board(MED_ROWS, MED_COLS);
  board.createBoard(document.getElementById("board"));
}
