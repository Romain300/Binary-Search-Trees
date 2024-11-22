import {mergeSort} from "./mergeSort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

//To see tree in a structured format:
function prettyPrint (node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

//Build a BST from an array, it removes duplicate and sorts the array before.
function buildTree(array) {
    array = mergeSort(array);

    function recursion(sortedArray) {
        const length = sortedArray.length;
    
        if (length < 1) return null;

        const middle = Math.floor(length / 2);
        const leftArray = sortedArray.slice(0, middle);
        const rightArray = sortedArray.slice(middle + 1);

        const root = new Node(sortedArray[middle]);
        root.left = buildTree(leftArray);
        root.right = buildTree(rightArray);

        return root;
    };

    return recursion(array);

};


class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree(array);
    };

    insert(value) {
        const newNode = new Node(value);
        let node = this.root;

        if (!node) return null;

        while(node) {
            if(value < node.data) {
                if(node.left === null) {
                    node.left = newNode;
                    return newNode;
                };
                node = node.left;
            } else {
                if(node.right === null) {
                    node.right = newNode;
                    return newNode;
                };
                node = node.right;
            };
        };
    };


    deleteItem(value) {
        let node = this.root;

        if (!node) return null;

        while(node) {

            if(node.value === value) {
                //If no children
                if (node.right === null && node.left === null) {
                    node = null;
                    return;
                };

                //If one child
                if(node.right && !node.left || !node.right && node.left) {
                    if(node.right) {
                        node = node.right;
                        return;
                    };

                    if(node.left) {
                        node = node.left;
                        return;
                    };
                }

                //If two children 
                
            };

        }

        return null;

    }



};




let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
tree.insert(10);
prettyPrint(tree.root);