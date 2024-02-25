class Node {

    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }

}

class BinarySearchTree {
    
    
    constructor(array){
        
        this.root = this.buildTree(array);
    }

    static #buildNodes(array, start, end){

        if(start > end) return null;

        const mid = Math.round((start + end)/2);

        const root = new Node(array[mid]);

        root.left = BinarySearchTree.#buildNodes(array, start, mid-1);
        root.right = BinarySearchTree.#buildNodes(array, mid+1, end);

        return root;
    }


    buildTree(array){
        array.sort((a,b) => {return a - b;});

        return BinarySearchTree.#buildNodes(array, 0, (array.length - 1));
    }

    insert(value){

        let node = this.root;
        let previousNode = this.root;
        while(node) {
            if(value === node.value){
                return
            } else {
                if(value > node.value){
                    previousNode = node;
                    node = node.right;
                } else {
                    previousNode = node;
                    node = node.left;
                }
            }
        }
        if(value > previousNode.value){
            previousNode.right = new Node(value);
        } else {
            previousNode.left = new Node(value);
        }
    }

    find(value){

        let queue = [];
        queue.push(this.root);

        while(queue.length != 0){

            if(value === queue[0].value){
                return queue[0];
            }
            const Node = queue.shift();

            if(Node.left != null){
                queue.push(Node.left);
            }

            if(Node.right != null){
                queue.push(Node.right);
            }

        }        
    }

    delete(value, root = this.root){

        let node = root;
        let previousNode = root;
        while(node) {
            if(value === node.value){
                console.log(previousNode);
                console.log(node);
                
                if((node.left === null)&&(node.right === null)){
                    console.log("leaf");
                    if(previousNode.value > value){
                        previousNode.left = null;
                    } else if(previousNode.value < value){
                        previousNode.right = null;
                    }
                }

                if((node.left) && (node.right === null)){
                    console.log("one child");
                    if(previousNode.value > value){
                        previousNode.left = node.left;
                    } else if(previousNode.value < value){
                        previousNode.right = node.left;
                    }
                } else if((node.right) && (node.left === null)){
                    console.log("one child");
                    if(previousNode.value > value){
                        previousNode.left = node.right;
                    } else if(previousNode.value < value){
                        previousNode.right = node.right;
                    }
                }

                if((node.right) && (node.left)){
                    console.log("both childs");
                    if(previousNode.value > value){
                        let nextNode;
                        if(node.right.left === null){
                            nextNode = node.right;
                            nextNode.left = node.left;
                            previousNode.left = nextNode;
                        } else {
                            let tempNode = node.right;
                            while(tempNode.left){
                                nextNode = tempNode;
                                tempNode = tempNode.left;
                            }
                            previousNode.left.value = tempNode.value;
                            this.delete(tempNode.value, node.right);
                        }
                        
                    } else if(previousNode.value < value){
                        let nextNode;
                        if(node.right.left === null){
                            nextNode = node.right;
                            nextNode.left = node.left;
                            previousNode.left = nextNode;
                        } else {
                            let tempNode = node.right;
                            while(tempNode.left){
                                nextNode = tempNode;
                                tempNode = tempNode.left;
                            }
                            previousNode.right.value = tempNode.value;
                            this.delete(tempNode.value, node.right);
                        }
                    }
                }
                
                return
            } else {
                if(value > node.value){
                    previousNode = node;
                    node = node.right;
                } else {
                    previousNode = node;
                    node = node.left;
                }
            }
        }
        
          
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


let arr = [8,3,13,2,15,67,4,1,25,30,50,33,5,7,9,6,70];

const tree = new BinarySearchTree(arr);
tree.insert(80);
tree.insert(68);
tree.insert(69);
tree.insert(26);
tree.insert(27);
tree.insert(28);
tree.insert(29);
tree.insert(21);
console.log(prettyPrint((tree.root)));
tree.delete(33);
console.log(prettyPrint((tree.root)));





