function dfs(board, startNode, endNode)
{
  let stack = [startNode];
  let visitedNodesInOrder = [];

  while(stack.length > 0)
  {
    let currentNode = stack.pop();
    currentNode.visited = true;
    if(currentNode.isWall)
    {
      continue;
    }
    visitedNodesInOrder.push(currentNode);
    if(currentNode == endNode)
    {
      return visitedNodesInOrder;
    }
    neighbors = board.getUnvisitedNeighbors(currentNode);
    for(neighbor of neighbors)
    {
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}
