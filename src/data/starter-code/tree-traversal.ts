export const TREE_TRAVERSAL_STARTER_CODE = `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Initial Tree
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

/**
 * Perform Depth First Search (Pre-order)
 * @param {Node} node
 */
function dfs(node) {
  if (!node) return;
  
  console.log(node.value);
  
  dfs(node.left);
  dfs(node.right);
}

console.log("Starting DFS:");
dfs(root);`;

