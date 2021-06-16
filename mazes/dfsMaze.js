function dfsMaze(board)
{
  let startNode = board.nodes[1][1];
  let stack = [startNode];
  let visitedNodesInOrder = [];

  while (stack.length > 0)
  {
    let currentNode = stack.pop();

    let neighbors = board.getUnvisitedMazeNeighbors(currentNode);

    if(neighbors.length > 0)
    {
      let randomIndex = Math.floor(Math.random() * neighbors.length);

      for(let i = 0; i < neighbors.length; i++)
      {
        neighbors[i].visited = true;

        let connectingNodeRow = currentNode.row + ((neighbors[i].row - currentNode.row) / 2);
        let connectingNodeCol = currentNode.col + ((neighbors[i].col - currentNode.col) / 2);
        let connectingNode = board.nodes[connectingNodeRow][connectingNodeCol];

        connectingNode.isWall = false;
        neighbors[i].isWall = false;
        visitedNodesInOrder.push(connectingNode, neighbors[i]);


        if(i != randomIndex)
        {
          stack.push(neighbors[i]);
        }
      }

      stack.push(neighbors[randomIndex]);
    }
  }

  return visitedNodesInOrder;
}
