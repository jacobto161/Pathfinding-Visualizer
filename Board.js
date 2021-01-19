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

  getNodeByID(id)
  {
    return nodes[id.substring(id.indexOf("r") + 1, id.indexOf("c"))][id.substring(id.indexOf("c" + 1))];
  }
}
