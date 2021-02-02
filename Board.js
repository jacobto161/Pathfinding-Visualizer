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
    this.currentAlgorithm = null;
    let self = this;
    this.createBoard(document.getElementById("board"));
    this.createNodeEventListeners();
    this.initializeButtons(self);
    this.initializeMouseEventListeners();
  }

  //Creates DOM elements for grid using divs displayed as a table
  //Creates Node Objects corresponding to each cell and stores them in nodes array.
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
        //All nodes and cells have id's of r_c_
        var node = new Node("r" + r + "c" + c, this);

        var cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = node.id;
        //Setting a Start Node
        if(r == DEFAULT_START_ROW && c == DEFAULT_START_COL)
        {
          cell.classList.add("start");
          node.isStart = true;
          this.start = node;
        }
        //Setting a Target Node
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
  }

  initializeButtons(self)
  {
    document.getElementById("dijkstra-button").onclick = function()
    {
      self.resetBoard();
      self.visualizeDijkstra();
      self.currentAlgorithm = "dijkstra";
    }
    document.getElementById("eraser-button").onclick = function()
    {
      toolEnabled = "erase";
    }
    document.getElementById("wall-button").onclick = function()
    {
      toolEnabled = "wall";
    }
    document.getElementById("weight-button").onclick = function()
    {
      toolEnabled = "weight";
    }
  }

  initializeMouseEventListeners()
  {
    document.getElementById("board").onmousedown = function()
    {
      isMouseDown = true;
      console.log(toolEnabled);
    }

    document.getElementById("board").onmouseup = function()
    {
      isMouseDown = false;
      isDraggingStart = false;
      isDraggingTarget = false;
    }

    document.getElementById("board").onmouseleave = function()
    {
      if(!isDraggingStart && !isDraggingTarget)
      {
        isMouseDown = false;
      }
    }
  }

  createNodeEventListeners()
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

  //Calls Dijkstra Algorithm
  visualizeDijkstra()
  {
    let visitedNodesInOrder = dijkstra(this, this.start, this.target);
    let nodePath = getNodePath(this.target);
    this.animateDijkstra(visitedNodesInOrder, nodePath, 5);
  }

  //Update Dijkstra Algorithm when conditions change
  updateDijkstra()
  {
    this.resetBoard();
    let visitedNodesInOrder = dijkstra(this, this.start, this.target);
    let nodePath = getNodePath(this.target);
    this.instantDijkstra(visitedNodesInOrder, nodePath);
  }

  //Visualizes Dijkstra Algorithm instantly without anmation
  instantDijkstra(visitedNodesInOrder, nodePath)
  {
    for(let node of visitedNodesInOrder)
    {
      let cell = node.getCell();
      cell.classList.remove("unvisited");
      cell.classList.add("visited");
    }
    for(let node of nodePath)
    {
      let cell = node.getCell();
      cell.classList.add("path");
    }
  }

//uses the array of visited nodes returned by dijkstra to animate.
  animateDijkstra(visitedNodesInOrder, nodePath, timeInterval)
  {
    for(let i = 0; i <= visitedNodesInOrder.length; i++)
    {
      if(i == visitedNodesInOrder.length)
      {
        setTimeout(() => {
          this.animatePath(nodePath, timeInterval);
        }, timeInterval * i);
        return;
      }
      setTimeout(() => {
        let node = visitedNodesInOrder[i];
        let cell = node.getCell();
        cell.classList.remove("unvisited");
        cell.classList.add("visited");
      }, timeInterval * i);
    }
  }

//Uses the array of the path to animate.
  animatePath(nodePath, timeInterval)
  {
    for (let i = 0; i < nodePath.length; i++)
    {
      setTimeout(() => {
        let node = nodePath[i];
        let cell = document.getElementById("r" + node.row + "c" + node.col);
        cell.classList.remove("visited");
        cell.classList.add("path");
      }, timeInterval * 10 * i);
    }
  }

//Resets the board to allow another algorithm to be visualized.
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

//Returns a 1D list of nodes.
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
