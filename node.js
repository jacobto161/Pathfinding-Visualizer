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
}
