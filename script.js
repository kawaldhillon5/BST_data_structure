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

       let node = this.root;
        while(node) {
            if(value === node.value){
                return node;
            } else {
                if(value > node.value){
                    node = node.right;
                } else {
                    node = node.left;
                }
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
                    } else if(previousNode.value === value){
                        let nextNode;
                        if(node.right.left === null){
                            nextNode = node.right;
                            this.delete(nextNode.value, node);
                            node.value = nextNode.value;
                        } else {
                            let tempNode = node.right;
                            while(tempNode.left){
                                nextNode = tempNode;
                                tempNode = tempNode.left;
                            }
                            node.value = tempNode.value;
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

    levelOrder(callback){

        let queue = [];
        queue.push(this.root);
        let i = 0;
        let arrayReturn = [];
        while(queue.length != 0){

            const Node = queue.shift();
            if(typeof callback === 'function'){
                callback(Node);
            } else if(callback === undefined){
                arrayReturn[i] = Node;
            }
            if(Node.left != null){
                queue.push(Node.left);
            }

            if(Node.right != null){
                queue.push(Node.right);
            }
            ++i;
        }
        if(arrayReturn.length){
            return arrayReturn;
        }
    }

    preOrder(callback,node = this.root,arr = [], i = [0]){

        if(node === null) return;
        
        if(typeof callback === 'function'){
            callback(node.value);
        } else {
            arr[i[0]] = node.value;
        }
        i[0] = (i[0]+1);
        this.preOrder(callback,node.left, arr, i);
        this.preOrder(callback,node.right, arr, i);

        if(arr.length) return arr;
    }

    inOrder(callback, node = this.root, arr=[], i = [0]){

        if(node === null) return;

        this.inOrder(callback,node.left, arr, i);
        
        if(typeof callback === 'function'){
            callback(node.value);
        } else {
            arr[i[0]] = node.value;
        }
        i[0] = (i[0]+1);

        this.inOrder(callback,node.right, arr, i);

        if(arr.length) return arr;

    }

    postOrder(callback, node = this.root, arr=[], i = [0]){

        if(node === null) return;

        this.postOrder(callback,node.right, arr, i);

        if(typeof callback === 'function'){
            callback(node.value);
        } else {
            arr[i[0]] = node.value;
        }
        i[0] = (i[0]+1);

        this.postOrder(callback,node.left, arr, i);

        if(arr.length) return arr;
    }

    static #max(a,b){
        return a>b ? a : b;
    }

    #findHeight(node){
        if(node === null) return -1;

        return BinarySearchTree.#max(this.#findHeight(node.left), this.#findHeight(node.right)) + 1;
    }

    heigth(value){
        return this.#findHeight(this.find(value));
    }

    depth(value){

        let depth = 0;
        let node = this.root;

        while(node){

            if(node.value === value){
                return depth;
            } else if(value > node.value){
                ++depth;
                node = node.right;
            } else {
                ++depth;
                node = node.left;
            } 

        }
    }

    isBalanced(node = this.root, ){

        let  isBalanced = true;
        this.levelOrder((node) =>{

            const leftHeight = this.#findHeight(node.left);
            const rightHeight = this.#findHeight(node.right);
            let difference = 0;
            if(rightHeight > leftHeight){
                difference = rightHeight - leftHeight;
            } else {
                difference = leftHeight - rightHeight;
            }

            if(difference > 1){
                isBalanced = false;
            }

        });




        return isBalanced;



    }

    static #insertionSort(array){
        for(let i = 1; i < array.length; i++){
            let current = array[i];
            let j = i - 1;

            while(j > -1 && current < array[j]){
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = current;
        }
        return array;
    }

    rebalance(){
        let array = BinarySearchTree.#insertionSort(this.inOrder())
        return this.root = BinarySearchTree.#buildNodes(array, 0, (array.length - 1))
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

function doSome(node){
    console.log(node);
}


let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const tree = new BinarySearchTree(arr);

console.log(tree.isBalanced());
tree.insert(32);
tree.insert(33);
tree.insert(0);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(prettyPrint((tree.root)));











