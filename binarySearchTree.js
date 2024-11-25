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

        if (!node) {
            this.root = newNode;
            return `Node ${value} has been added`;
        };

        while(node) {
            if(value < node.data) {
                if(node.left === null) {
                    node.left = newNode;
                     return `Node ${value} has been added`
                };
                node = node.left;
            } else {
                if(node.right === null) {
                    node.right = newNode;
                     return `Node ${value} has been added`
                };
                node = node.right;
            };
        };

    };


    deleteItem(value) {
        let node = this.root;
        let parent = null;

        if (!node) return null;

        while(node) {

            if(node.data === value) {
               
                //If no children
                if (node.right === null && node.left === null ) {
                    if (node === this.root) {
                        this.root = null;
                    } else if (parent.right === node) {
                        parent.right = null;
                    } else if (parent.left === node) {
                        parent.left = null;
                    };
                    return `Node ${value} has been deleted`;
                };

                //If one child
                if(node.right === null || node.left === null) {
                    const child = node.right || node.left;
                    if (node === this.root) {
                        this.root = child;
                    } else if (parent.right === node) {
                        parent.right = child;
                    } else if (parent.left === node) {
                        parent.left = child;
                    };

                    return `Node ${value} has been deleted`;
                };


                //If two children 
                if(node.right && node.left) { 
                    let inorderSuccessor = node.right;
                    let parentSuccessor = node;

                    while(inorderSuccessor.left) {
                        parentSuccessor = inorderSuccessor;
                        inorderSuccessor = inorderSuccessor.left;
                    };

                    node.data = inorderSuccessor.data;

                    //review the following partie
                    
                    if (inorderSuccessor.right) {
                        if (parentSuccessor.left === inorderSuccessor) {
                            parentSuccessor.left = inorderSuccessor.right;
                        } else {
                            parentSuccessor.right = inorderSuccessor.right;
                        };
                    } else {
                        if(parentSuccessor.left === inorderSuccessor) {
                            parentSuccessor.left = null;
                        } else {
                            parentSuccessor.right = null;
                        }
                        
                    }

                    return `Node ${value} has been deleted`;
                }; 
            };

            parent = node;
            if (value < node.data) {
                node = node.left;
            } else {
                node = node.right;
            };
        };
        return null;
    };

    find(value) {
        let node = this.root;
        
        while(node) {
            if (node.data === value) return node;

            if (value < node.data) {
                node = node.left
            } else {
                node = node.right;
            }
        };

        return "Value not is the tree";
    };

    //Breadth-First
    levelOrder(callback) {
        if (this.root === null) return null;
        if(typeof(callback) !== "function") throw new Error("Use a function as argument");

        let queue = [];
        
        queue.push(this.root);

        while(queue.length > 0) {

            let node = queue.shift();
            callback(node);

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);

        };

        return;
    };

    inOrder(callback) {
        let node = this.root;
        if (node === null) return null;
        if(typeof(callback) !== "function") throw new Error("Use a function as argument");

        recursion(node);

        function recursion(node) {
            
            if(node.left) recursion(node.left);

            callback(node);

            if(node.right) recursion(node.right);
        } 
    }

};




let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
function printNode(node) {
    console.log(node.data)
};
tree.inOrder(printNode);

