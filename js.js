var MED_ROWS = 20;
var MED_COLS = 20;

function createGrid()
{
  var board = new Board(MED_ROWS, MED_COLS);
  board.createBoard(document.getElementById("board"));

  document.getElementById("dijkstra-button").onclick = function(){board.resetBoard(); board.visualizeDijkstra();};
}
