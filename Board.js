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
