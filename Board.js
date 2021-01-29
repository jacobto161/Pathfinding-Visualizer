class Board
{
  constructor(rows, cols)
  {
    this.rows = rows;
    this.cols = cols;
    this.start = null;
    this.target = null;
    this.nodes = [];
    this.isMouseDown = false;
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
        var node = new Node("r" + r + "c" + c);

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
          cell.classList.add("unvisited");

        row.appendChild(cell);
        currentNodeRow.push(node);
      }
      body.appendChild(row);
      this.nodes.push(currentNodeRow);
    }
    this.createEventListeners();
  }

  createEventListeners()
  {
    for(let r = 0; r < this.rows; r++)
    {
      for(let c = 0; c < this.cols; c++)
      {
        let cell = document.getElementById("r" + r + "c" + c);
        let node = this.nodes[r][c];
        cell.addEventListener("mousedown", function() {node.handleMouseDown();});
        cell.addEventListener("mouseenter", function() {node.handleMouseEnter();});
        cell.addEventListener("mouseleave", function() {node.handleMouseLeave();});
      }
    }
  }

  visualizeDijkstra()
  {
    this.update();
    let visitedNodesInOrder = dijkstra(this, this.start, this.target);
    let nodePath = getNodePath(this.target);
    this.animateDijkstra(visitedNodesInOrder, nodePath);
  }

  update()
  {
    for(const row of this.nodes)
    {
      for(const node of row)
      {
        if(node.isTarget)
        {
          this.target = node
        }
        if(node.isStart)
        {
          this.start = node;
        }
      }
    }
  }

  animateDijkstra(visitedNodesInOrder, nodePath)
  {
    for(let i = 0; i <= visitedNodesInOrder.length; i++)
    {
      if(i == visitedNodesInOrder.length)
      {
        setTimeout(() => {
          this.animatePath(nodePath);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        let node = visitedNodesInOrder[i];
        let cell = document.getElementById("r" + node.row + "c" + node.col);
        cell.classList.remove("unvisited");
        cell.classList.add("visited");
      }, 5 * i);
    }
  }

  animatePath(nodePath)
  {
    for (let i = 0; i < nodePath.length; i++)
    {
      setTimeout(() => {
        let node = nodePath[i];
        let cell = document.getElementById("r" + node.row + "c" + node.col);
        cell.classList.remove("visited");
        cell.classList.add("path");
      }, 50 * i);
    }
  }

  resetBoard()
  {
    for(const row of this.nodes)
    {
      for(const node of row)
      {
        node.previousNode = null;
        node.distance = Infinity;
        node.visited = false;
        let cell = document.getElementById(node.id);
        cell.classList.remove("visited", "path");
        cell.classList.add("unvisited");
      }
    }
  }

  getNodeList()
  {
    var list = [];
    for(var i = 0; i < this.nodes.length; i++)
    {
      list = list.concat(this.nodes[i]);
    }
    return list;
  }
}
