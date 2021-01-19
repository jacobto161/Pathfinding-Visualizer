var rows = 15;
var cols = 15;

function createGrid()
{
  // gets reference for grid <div>
  var body = document.getElementById("grid");

  var board = new Board(rows, cols)

  var defaultStartCoordinate = [Math.floor(rows / 2), Math.floor(rows / 5)];
  var defaultTargetCorrdinate = [Math.floor(rows / 2), 4 * Math.floor(rows / 5)];

  // creates a <table> and assigning body
  var tbl = document.createElement("table");
  tbl.id = "board";

  // creating all nodes
  for (var r = 0; r < rows; r++) {
    // creates a table row and assigns id

    var row = document.createElement("tr");
    row.id = "row" + r.toString();

    var currentNodeRow = [];

    for (var c = 0; c < cols; c++) {
      var cell = document.createElement("td");
      cell.id = "r" + r.toString() + "-c" + c.toString();
      if(r == defaultStartCoordinate[0] && c == defaultStartCoordinate[1])
      {
        cell.className = "start"
        board.start = cell.id;
      }
      else if(r == defaultTargetCorrdinate[0] && c == defaultTargetCorrdinate[1])
      {
        cell.className = "target";
        board.target = cell.id;
      }
      else
      {
        cell.className = "unvisited";
      }

      row.appendChild(cell);

      var node = new Node(cell.id, cell.className);

      currentNodeRow.push(node);
    }

    // add the row to the end of the table body
    tbl.appendChild(row);
    board.nodes.push(currentNodeRow);
  }

  // appends <table> into <body>
  body.appendChild(tbl);
  board.setupAdjacentNodes();
}
