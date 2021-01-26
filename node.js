class Node
{
  constructor(id, status)
  {
    this.id = id;
    this.status = status;
    this.row = parseInt(id.substring(1, id.indexOf("c") - 1));
    this.col = parseInt(id.substring(id.indexOf("c") + 1));
    this.distance = Infinity;
    this.weighted = false;
    this.visited = false;
    this.isWall = false;
    this.previousNode = null;
  }
}
