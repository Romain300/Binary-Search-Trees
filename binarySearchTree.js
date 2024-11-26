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

        return null;
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
        };
    };

    preOrder(callback) {
        let node = this.root;
        if (node === null) return null;
        if(typeof(callback) !== "function") throw new Error("Use a function as argument");

        recursion(node);

        function recursion(node) {

            callback(node);

            if(node.left) recursion(node.left);

            if(node.right) recursion(node.right);

        };
    };

    postOrder(callback) {
        let node = this.root;
        if (node === null) return null;
        if(typeof(callback) !== "function") throw new Error("Use a function as argument");

        recursion(node);

        function recursion(node) {

            if(node.left) recursion(node.left);

            if(node.right) recursion(node.right);

            callback(node);

        };
    };

    height(value) {
        const node = this.find(value);

        return recursion(node);

        function recursion(node) {

            if (!node) return 0;
            
            if (!node.left && !node.right) return 0;

            return 1 + Math.max(recursion(node.right), recursion(node.left))
        };
    };

    depth(value) {
        const nodeToFind = this.find(value);
        if (!nodeToFind) return null;
        let node = this.root;
        if(!node) return 0;

        let step = 0;
        
        while(node) {
            if(node.data === value) return step;
            
            if(value < node.data) {
                node = node.left;
                step += 1;
            }

            if(value > node.data) {
                node = node.right;
                step += 1;
            }

        };
    };

    
    isBalanced() {
        let node = this.root;

        const recursion = (node) => {

            if(!node) return true;

            const leftHeight = node.left ? this.height(node.left.data) : 0;
            const rightHeight = node.right ? this.height(node.right.data) : 0;

            if(Math.abs(leftHeight - rightHeight ) > 1) {
                return false
            };

            if(recursion(node.left) === false || recursion(node.right) === false) return false;

            return true;
        };

        return recursion(node)
  
    };

};




let tree = new Tree([1, 2, 3, 4, 5, 6, 100, 7, 8, 9]);
tree.insert(200)
tree.insert(300)
tree.insert(400)
prettyPrint(tree.root);
function printNode(node) {
    console.log(node.data)
};

console.log(tree.height(400))
console.log(tree.height(100))
console.log(tree.height(6))
console.log(tree.height(9))


console.log(tree.isBalanced())

