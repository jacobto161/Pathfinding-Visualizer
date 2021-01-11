var rows = 15;
var cols = 15;

class Board
{
  constructor(rows, cols)
  {
    this.rows = rows;
    this.cols = cols;
    this.start = null;
    this.target = null;
  }
}


function createGrid()
{
  // gets reference for grid <div>
  var body = document.getElementById("grid");

  // creates a <table> and assigning body
  var tbl = document.createElement("table");
  tbl.id = "board";

  // creating all nodes
  for (var r = 0; r < rows; r++) {
    // creates a table row and assigns id

    var row = document.createElement("tr");
    row.id = "row" + r.toString();

    for (var c = 0; c < cols; c++) {
      var cell = document.createElement("td");
      cell.id = "r" + r.toString() + "-c" + c.toString();
      cell.classList.add("unvisited");
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tbl.appendChild(row);
  }

  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
}
