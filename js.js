var MED_ROWS = 25;
var MED_COLS = 25;
var isMouseDown = false;
var isDraggingStart = false;
var isDraggingTarget = false;
var isPassing = false;

function createGrid()
{
  var board = new Board(MED_ROWS, MED_COLS);
  board.createBoard(document.getElementById("board"));

  document.getElementById("dijkstra-button").onclick = function(){board.resetBoard(); board.visualizeDijkstra();};
  mouse();
}

function mouse()
{
  document.getElementById("board").onmousedown = function()
  {
    isMouseDown = true;
  }

  document.getElementById("board").onmouseup = function()
  {
    isMouseDown = false;
    isDraggingStart = false;
    isDraggingTarget = false;
    isPassing = false;
  }

  document.getElementById("board").onmouseleave = function()
  {
    if(!isDraggingStart && !isDraggingTarget)
    {
      isMouseDown = false;
    }
  }
}
