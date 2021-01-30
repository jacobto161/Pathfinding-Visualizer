class Node
{
  constructor(id)
  {
    this.id = id;
    this.isStart = false;
    this.isTarget = false;
    this.row = parseInt(id.substring(1, id.indexOf("c")));
    this.col = parseInt(id.substring(id.indexOf("c") + 1));
    this.distance = Infinity;
    this.weighted = false;
    this.visited = false;
    this.isWall = false;
    this.previousNode = null;
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
        cell.classList.remove("wall");
      }
      else if(toolEnabled == "wall")
      {
        this.isWall = true;
        cell.classList.add("wall");
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
      }
      //Dragging Target Node
      else if(isDraggingTarget)
      {
        cell.classList.add("target");
        this.isWall = false;
        this.isTarget = true;
      }
      //Make Wall or Erase
      else if(!this.isStart && !this.isTarget)
      {
        if(toolEnabled == "erase")
        {
          this.isWall = false;
          cell.classList.remove("wall");
        }
        else if(toolEnabled = "wall")
        {
          this.isWall = true;
          cell.classList.add("wall");

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
}
