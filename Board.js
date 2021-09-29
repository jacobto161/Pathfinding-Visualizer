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
    this.updateOnChange = false;
    this.Default_START_ROW = Math.floor(this.rows / 2);
    this.Default_START_COL = Math.floor(this.cols / 5);
    this.Default_TARGET_ROW = Math.floor(this.rows / 2);
    this.Default_TARGET_COL = Math.floor((this.cols / 5) * 4);
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
        if(r == this.Default_START_ROW && c == this.Default_START_COL)
        {
          cell.classList.add("start");
          node.isStart = true;
          this.start = node;
        }
        //Setting a Target Node
        else if(r == this.Default_TARGET_ROW && c == this.Default_TARGET_COL)
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
    document.getElementById("algorithm-selector").onchange = function()
    {
      self.clearBoard();
      self.updateOnChange = false;
    }
    document.getElementById("visualize-button").onclick = function()
    {
      self.visualize();
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
    document.getElementById("clear-button").onclick = function()
    {
      self.clearBoard();
      self.updateOnChange = false;
    }
    document.getElementById("maze-button").onclick = function()
    {
      self.generateMaze();
    }
    document.getElementById("reset-button").onclick = function()
    {
      self.resetBoard();
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

  generateMaze()
  {
    this.resetBoard();

    for(let row of this.nodes)
    {
      for(let node of row)
      {
        let cell = document.getElementById(node.id);


        cell.classList.add("wall");
        if(!node.isTarget && !node.isStart)
        {
          node.isWall = true;
        }
      }
    }

    let currentAlgorithm = document.getElementById("maze-selector").value;
    let visitedNodesInOrder;

    switch(currentAlgorithm)
    {
      case "dfs":
        visitedNodesInOrder = dfsMaze(this);
        break;
    }

    this.animateMaze(visitedNodesInOrder);
  }

  //Visualizes the algorithm with animation.
  visualize()
  {
    this.updateOnChange = true;
    this.clearBoard();
    let currentAlgorithm = document.getElementById("algorithm-selector").value;
    let visitedNodesInOrder;
    //Selects selected algorithm
    switch(currentAlgorithm)
    {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(this, this.start, this.target);
        break;

      case "bfs":
        visitedNodesInOrder = bfs(this, this.start, this.target);
        break;

      case "dfs":
        visitedNodesInOrder = dfs(this, this.start, this.target);
        break;

      case "astar":
        visitedNodesInOrder = astar(this, this.start, this.target);
        break;
    }
    let nodePath = this.getNodePath();
    this.animate(visitedNodesInOrder, nodePath, 5);
  }

  //Update Algorithm when conditions change
  update()
  {
    console.log("updating");
    if(!this.updateOnChange)
    {
      return;
    }
    this.clearBoard();
    let currentAlgorithm = document.getElementById("algorithm-selector").value;
    let visitedNodesInOrder;
    switch(currentAlgorithm)
    {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(this, this.start, this.target);
        break;

      case "bfs":
        visitedNodesInOrder = bfs(this, this.start, this.target);
        break;

      case "dfs":
        visitedNodesInOrder = dfs(this, this.start, this.target);
        break;

      case "astar":
        visitedNodesInOrder = astar(this, this.start, this.target);
        break;
    }
    let nodePath = this.getNodePath();
    this.instantAnimate(visitedNodesInOrder, nodePath);
  }

  animateMaze(visitedNodesInOrder)
  {
    for(let node of visitedNodesInOrder)
    {
      let cell = node.getCell();
      cell.classList.remove("wall");
    }
  }

  //Visualizes algorithms instantly without anmation
  instantAnimate(visitedNodesInOrder, nodePath)
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

//uses the array of visited nodes and path to animate.
  animate(visitedNodesInOrder, nodePath, timeInterval)
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

  getUnvisitedNeighbors(node)
  {
    let neighbors = this.getNeighbors(node);

    return neighbors.filter(neighbor => !neighbor.visited);
  }

  getUnvisitedMazeNeighbors(node)
  {
    let neighbors = this.getMazeNeighbors(node);

    return neighbors.filter(neighbor => !neighbor.visited);
  }

  getMazeNeighbors(node)
  {
    let neighbors = [];

    if(node.col < this.nodes[0].length - 2)
    {
      neighbors.push(this.nodes[node.row][node.col + 2]);
    }

    if(node.col > 1)
    {
      neighbors.push(this.nodes[node.row][node.col - 2]);
    }

    if(node.row > 1)
    {
      neighbors.push(this.nodes[node.row - 2][node.col]);
    }

    if(node.row < this.nodes.length - 2)
    {
      neighbors.push(this.nodes[node.row + 2][node.col]);
    }

    return neighbors;
  }

  isAnyNeighborVisited(node)
  {
    let neighbors = this.getNeighbors(node);

    for(let neighbor of neighbors)
    {
      if(neighbor.visited)
      {
        return true;
      }
    }
    return false;
  }

  getNeighbors(node)
  {
    let neighbors = [];

    if(node.col < this.nodes[0].length - 1)
    {
      neighbors.push(this.nodes[node.row][node.col + 1]);
    }

    if(node.col > 0)
    {
      neighbors.push(this.nodes[node.row][node.col - 1]);
    }

    if(node.row > 0)
    {
      neighbors.push(this.nodes[node.row - 1][node.col]);
    }

    if(node.row < this.nodes.length - 1)
    {
      neighbors.push(this.nodes[node.row + 1][node.col]);
    }

    return neighbors;
  }

  //Clears the board to allow another algorithm to be visualized.
  clearBoard()
  {
    for(const row of this.nodes)
    {
      for(const node of row)
      {
        node.previousNode = null;
        node.distance = Infinity;
        node.visited = false;
        node.gScore = Infinity;
        node.hScore = Infinity;
        let cell = document.getElementById(node.id);
        cell.classList.remove("visited", "path");
        cell.classList.add("unvisited");
      }
    }
  }

  resetBoard()
  {
    this.clearBoard();
    this.updateOnChange = false;

    for(let row of this.nodes)
    {
      for(let node of row)
      {
        let cell = document.getElementById(node.id);
        cell.classList.remove("weight", "wall", "start", "target");
        node.isStart = false;
        node.isTarget = false;
        node.isWall = false;
        this.weight = 1;

        if(node.row == this.Default_START_ROW && node.col == this.Default_START_COL)
        {
          cell.classList.add("start");
          node.isStart = true;
          this.start = node;
        }

        else if(node.row == this.Default_TARGET_ROW && node.col == this.Default_TARGET_COL)
        {
          cell.classList.add("target");
          node.isTarget = true;
          this.target = node;
        }
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

  //Must be called after dijkstra and will return the path of nodes.
  getNodePath()
  {
    let nodePath = [];
    let currentNode = this.target;

    while(currentNode != null)
    {
      nodePath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodePath;
  }

  getManhattanDistance(nodeA, nodeB)
  {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  }
}
