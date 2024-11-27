# Binary Search Tree (BST) in JavaScript

This repository implements a Binary Search Tree (BST) in JavaScript, along with various methods to manipulate and traverse the tree.

## Features

- **Node Class**: Represents each node in the tree with data and left/right children.
- **Tree Class**: Provides a variety of methods to build, manipulate, and traverse a binary search tree.
- **Sorting & Insertion**: Sorts input array and inserts nodes into the tree.
- **Traversal**: Supports multiple tree traversal methods including:
  - Breadth-First
  - In-Order
  - Pre-Order
  - Post-Order
- **Deletion**: Removes nodes from the tree with handling for different cases (no children, one child, two children).
- **Balance Checking & Rebalancing**: Checks if the tree is balanced and rebalances if necessary.

## Methods

- `insert(value)`: Inserts a new value into the BST.
- `deleteItem(value)`: Deletes a value from the BST.
- `find(value)`: Finds and returns a node with the specified value.
- `levelOrder(callback)`: Traverses the tree in breadth-first order.
- `inOrder(callback)`: Traverses the tree in in-order fashion.
- `preOrder(callback)`: Traverses the tree in pre-order fashion.
- `postOrder(callback)`: Traverses the tree in post-order fashion.
- `height(value)`: Returns the height of the tree at the specified node.
- `depth(value)`: Returns the depth of the tree at the specified node.
- `isBalanced()`: Checks if the tree is balanced.
- `rebalance()`: Rebalances the tree if it's unbalanced.

## Example Usage

```javascript
import { mergeSort } from "./mergeSort.js";
import { Tree } from "./tree.js";

// Create a new tree with an array of numbers
const tree = new Tree([5, 3, 7, 2, 4, 6, 8]);

// Insert a new value
tree.insert(1);

// Delete a value
tree.deleteItem(4);

// Traverse the tree in-order
tree.inOrder(node => console.log(node.data));

// Check if the tree is balanced
console.log(tree.isBalanced()); // true or false
```

## Dependencies

- `mergeSort.js` (used for sorting input arrays).

## License

This project is licensed under the MIT License.