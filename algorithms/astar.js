/*
  A* is weighted and guarantees the shortest path. Calling the
  function will return an array of nodes in the order of the visitation
  for animation. Each node has a g score (distance from start) and an h score or
  heuristic (estimated distance from target). F score is the sum of both.
  Nodes Visited in order of lowest f score which results in a much more optimized
  pathfinding algorithm.
*/
function astar(board, startNode, endNode)
{
  let openSet = [startNode];
  let visitedNodesInOrder = [];
  startNode.gScore = 0;
  startNode.hScore = board.getManhattanDistance(startNode, endNode);
  while(openSet.length > 0)
  {
    //Sorts openSet every time.
    sortNodesByFScore(openSet);
    let currentNode = openSet.shift();

    //Skip nodes if they are walls.
    if(currentNode.isWall)
    {
      continue;
    }

    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    //Found target node
    if(currentNode == endNode)
    {
      return visitedNodesInOrder;
    }

    //Gets all neighbors of node and updates them if the new calculated g score is
    //better than the old g score.
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

//Sorts an array of nodes by ascending f score.
function sortNodesByFScore(openSet)
{
  openSet.sort((nodeA, nodeB) => nodeA.getFScore() - nodeB.getFScore());
}
