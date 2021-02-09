class Node
{
  constructor(id, board)
  {
    this.id = id;
    this.board = board;
    this.isStart = false;
    this.isTarget = false;
    this.row = parseInt(id.substring(1, id.indexOf("c")));
    this.col = parseInt(id.substring(id.indexOf("c") + 1));
    this.distance = Infinity;
    this.weight = 1;
    this.visited = false;
    this.isWall = false;
    this.previousNode = null;
    this.gScore = Infinity;
    this.hScore = Infinity;
  }

//Returns DOM cell of node
  getCell()
  {
    return document.getElementById(this.id);
  }

  handleMouseDown()
  {
    let cell = document.getElementById(this.id);
    //Make Wall or Erase
    if(!this.isStart && !this.isTarget)
    {
      if(toolEnabled == "erase")
      {
        this.isWall = false;
        this.weight = 1;
        cell.classList.remove("wall", "weight");
      }
      else if(toolEnabled == "wall")
      {
        this.isWall = true;
        this.weight = 1;
        cell.classList.add("wall");
        cell.classList.remove("weight");
      }
      else if(toolEnabled == "weight")
      {
        this.isWall = false;
        cell.classList.remove("wall");
        cell.classList.add("weight");
        this.weight = DEFAULT_WEIGHTED;
      }
    }

    //If Target and Start are same node, always drag target.
    if(this.isStart && this.isTarget)
    {
      isDraggingTarget = true;
    }

    //Drag Start Node
    else if(this.isStart)
    {
      isDraggingStart = true;
    }

    //Drag Target Node
    else if(this.isTarget)
    {
      isDraggingTarget = true;
    }
  }

  handleMouseEnter()
  {
    let cell = document.getElementById(this.id);
    if(isMouseDown)
    {
      //Dragging Start Node
      if(isDraggingStart)
      {
        cell.classList.add("start");
        this.isWall = false;
        this.isStart = true;
        this.board.start = this;
        this.board.update();
      }
      //Dragging Target Node
      else if(isDraggingTarget)
      {
        cell.classList.add("target");
        this.isWall = false;
        this.isTarget = true;
        this.board.target = this;
        this.board.update();
      }
      //Make Wall or Erase
      else if(!this.isStart && !this.isTarget)
      {
        if(toolEnabled == "erase")
        {
          this.isWall = false;
          this.weight = 1;
          cell.classList.remove("wall", "weight");
        }
        else if(toolEnabled == "wall")
        {
          this.isWall = true;
          this.weight = 1;
          cell.classList.add("wall");
          cell.classList.remove("weight");
        }
        else if(toolEnabled == "weight")
        {
          this.isWall = false;
          cell.classList.remove("wall");
          cell.classList.add("weight");
          this.weight = DEFAULT_WEIGHTED;
        }
      }
    }
  }

  handleMouseLeave()
  {
    let cell = document.getElementById(this.id);
    if(isMouseDown)
    {
      //Dragging Start/Target Over each other.
      if(this.isTarget && this.isStart && isDraggingStart)
      {
        cell.classList.remove("start")
        this.isStart = false;
      }
      //Dragging Target
      else if(isDraggingTarget)
      {
        cell.classList.remove("target");
        this.isTarget = false;
      }
      //Dragging Start
      else if(isDraggingStart)
      {
        cell.classList.remove("start");
        this.isStart = false;
      }
      //Replace Wall
      if(cell.classList.contains("wall"))
      {
        this.isWall = true;
      }
    }
  }

  getFScore()
  {
    return this.gScore + this.hScore;
  }
}
