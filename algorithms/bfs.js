/*
Breadth First Search is unweighted and guarantees the shortest path. Calling the
function will return an array of nodes in the order of the visitation
for animation. Starts with a queue of nodes to be visited. Subsequent nodes
are added to the queue when they are discovered and they will be visited in the
order that they are discovered.
*/
function bfs(board, startNode, endNode)
{
  let queue = [startNode];
  let visitedNodesInOrder = [];
  startNode.visited = true;

  while(queue.length > 0)
  {
    let currentNode = queue.shift();
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
      neighbor.visited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }

  return visitedNodesInOrder;
}
