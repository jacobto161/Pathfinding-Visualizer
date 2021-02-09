function astar(board, startNode, endNode)
{
  let openSet = [startNode];
  let visitedNodesInOrder = [];
  startNode.gScore = 0;
  startNode.hScore = board.getManhattanDistance(startNode, endNode);
  while(openSet.length > 0)
  {
    sortNodesByFScore(openSet);
    let currentNode = openSet.shift();

    if(currentNode.isWall)
    {
      continue;
    }

    visitedNodesInOrder.push(currentNode);

    if(currentNode == endNode)
    {
      return visitedNodesInOrder;
    }

    let neighbors = board.getNeighbors(currentNode);
    for(let neighbor of neighbors)
    {
      let newGScore = currentNode.gScore + neighbor.weight;
      if(newGScore < neighbor.gScore)
      {
        neighbor.previousNode = currentNode;
        neighbor.gScore = newGScore;
        neighbor.hScore = board.getManhattanDistance(neighbor, endNode);

        if(!openSet.includes(neighbor))
        {
          openSet.push(neighbor);
        }
      }
    }
  }
  return visitedNodesInOrder;
}

function sortNodesByFScore(openSet)
{
  openSet.sort((nodeA, nodeB) => nodeA.getFScore() - nodeB.getFScore());
}
