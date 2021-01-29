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
    if(!this.isStart && !this.isTarget)
    {
      this.isWall = !this.isWall;
      if(this.isWall)
      {
        cell.classList.add("wall");
      }
      else
      {
        cell.classList.remove("wall");
      }
    }

    if(this.isStart && this.isTarget)
    {
      isDraggingTarget = true;
    }

    else if(this.isStart)
    {
      isDraggingStart = true;
    }

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
      if(isDraggingStart)
      {
        cell.classList.add("start");
        this.isWall = false;
        this.isStart = true;
        if(this.isTarget)
        {
          isPassing = true;
        }
      }
      else if(isDraggingTarget)
      {
        cell.classList.add("target");
        this.isWall = false;
        this.isTarget = true;
        if(this.isStart)
        {
          isPassing = true;
        }
      }
      else if(!this.isStart && !this.isTarget)
      {
        this.isWall = !this.isWall;
        if(this.isWall)
        {
          cell.classList.add("wall");
        }
        else
        {
          cell.classList.remove("wall");
        }
      }
    }
  }

  handleMouseLeave()
  {
    let cell = document.getElementById(this.id);
    if(isMouseDown)
    {
      if(this.isTarget && this.isStart && isDraggingStart)
      {
        cell.classList.remove("start")
        this.isStart = false;
      }
      else if(isDraggingTarget)
      {
        cell.classList.remove("target");
        this.isTarget = false;
      }
      else if(isDraggingStart)
      {
        cell.classList.remove("start");
        this.isStart = false;
      }

      if(cell.classList.contains("wall"))
      {
        this.isWall = true;
      }
    }
  }
}
