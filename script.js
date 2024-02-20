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


let arr = [3,2,1];

const tree = new BinarySearchTree(arr);
console.log(prettyPrint((tree.root)));


