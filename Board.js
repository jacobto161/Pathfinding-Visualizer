class Board
{
  constructor(rows, cols)
  {
    this.rows = rows;
    this.cols = cols;
    this.start = null;
    this.target = null;
    this.nodes = [];
  }

  createBoard(body)
  {
    const DEFAULT_START_ROW = Math.floor(this.rows / 2);
    const DEFAULT_START_COL = Math.floor(this.rows / 5);
    const DEFAULT_TARGET_ROW = Math.floor(this.rows / 2);
    const DEFAULT_TARGET_COL = Math.floor((this.rows / 5) * 4);

    for(let r = 0; r < this.rows; r++)
    {
      var row = document.createElement("div");
      row.classList.add("row")
      row.id = "row" + r;

      var currentNodeRow = [];

      for(let c = 0; c < this.cols; c++)
      {
        var node = new Node("r" + r + "-c" + c);

        var cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = node.id;
        if(r == DEFAULT_START_ROW && c == DEFAULT_START_COL)
        {
          cell.classList.add("start");
          node.isStart = true;
          this.start = node;
        }
        else if(r == DEFAULT_TARGET_ROW && c == DEFAULT_TARGET_COL)
        {
          cell.classList.add("target");
          node.isTarget = true;
          this.target = node;
        }
        else
        {
          cell.classList.add("unvisited");
        }

        row.appendChild(cell);
        currentNodeRow.push(node);
      }
      body.appendChild(row);
      this.nodes.push(currentNodeRow);
    }
  }

  getNodeByID(id)
  {
    return nodes[id.substring(id.indexOf("r") + 1, id.indexOf("c"))][id.substring(id.indexOf("c" + 1))];
  }

  getNodeList()
  {
    var list = [];
    for(var i = 0; i < nodes.length; i++)
    {
      list = list.concat(nodes[i]);
    }
    return list;
  }
}
