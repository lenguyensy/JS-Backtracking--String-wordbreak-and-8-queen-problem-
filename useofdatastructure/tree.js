/*
setup code
*/

function Node() {
    var t = this;

    t.left = null;
    t.right = null;
    t.val = null;
}

function BinarySearchTree() {
    var t = this;
    var root = new Node();
    t.root = root;

    var add = function(val, curNode) {
        if (curNode.val == null && curNode.left == null && curNode.right == null) {
            //root case
            curNode.val = val;
        } else if (val < curNode.val) {
            //traverse left
            if (curNode.left != null)
                add(val, curNode.left);
            else {
                curNode.left = new Node();
                curNode.left.val = val;
            }
        } else if (val >= curNode.val) {
            //traverse right
            if (curNode.right != null)
                add(val, curNode.right);
            else {
                curNode.right = new Node();
                curNode.right.val = val;
            }
        }
    }

    t.add = function(val) {
        add(val, root);
        return t;
    }




    var delCleanup = function(curNode, parentNode) {
        console.log(curNode, parentNode);

        var parentToMe;
        if (parentNode != null)
            parentToMe = parentNode.left == curNode ? 'left' : 'right';

        if (curNode.left == null && curNode.right == null) {
            parentNode[parentToMe] = null; //easy no children
        } else if (curNode.left != null && curNode.right != null) {
            //has 2 children, go left and right all the way
            var node = curNode.left;
            var pNode = parentNode;

            while (node.right != null) {
                pNode = node;
                node = node.right;
            }


            if (parentNode != null) {
                //if parent is not null
                node.right = pNode.right;
                parentNode[parentToMe] = node;
            } else {
                //if root				
                root.val = node.val;


                //remove my own reference.
                pNode.right = null;
            }
        } else {
            //has only one child, then swap itself with its children
            if (curNode.left != null) {
                parentNode[parentToMe] = curNode.left;
            } else if (curNode.right != null) {
                parentNode[parentToMe] = curNode.right;
            }
        }
    }
    var del = function(val, curNode, parentNode) {
        if (curNode.val == val) {
            delCleanup(curNode, parentNode);
        } else if (val <= curNode.val) {
            del(val, curNode.left, curNode);
        } else if (val > curNode.val) {
            del(val, curNode.right, curNode);
        }
    }
    t.del = function(val) {
        del(val, root, null);
        return t;
    }



    //traversing
    var traverseInOder = function(curNode, callback) {
        if (curNode.left != null)
            traverseInOder(curNode.left, callback);

        callback(curNode.val);

        if (curNode.right != null)
            traverseInOder(curNode.right, callback);
    }

    var traversePreOrder = function(curNode, callback) {
        callback(curNode.val);

        if (curNode.left != null)
            traversePreOrder(curNode.left, callback);

        if (curNode.right != null)
            traversePreOrder(curNode.right, callback);
    }

    t.printInOrder = function() {
        traverseInOder(root, function(val) {
            console.log(val);
        });
    }

    t.printPreOrder = function() {
        traversePreOrder(root, function(val) {
            console.log(val);
        });
    }


    //moris traverseal
    t.printInOrderLoop = function() {
        var cur = root;

        while (cur != null) {
            if (cur.left == null) {
                console.log(cur.val);
                cur = cur.right;
            } else {
                var rightCur = cur;
            }
        }
    }
}

function constructTree(a) {
    var b = new BinarySearchTree();

    for (var i = 0; i < a.length; i++) {
        b.add(a[i]);
    }

    return b;
}


var tree1 = constructTree([8, 3, 1, 6, 4, 7, 10, 14, 13]);


/*
	Implement a function to check if a tree is balanced For the purposes of this question,
a balanced tree is defined to be a tree such that no two leaf nodes differ in distance
from the root by more than one
*/
function isTreeBalance(root) {
    return getMaxDepth(root) - getMinDepth(root) <= 1;
}

function getMinDepth(node) {
    if (node === null || typeof node === 'undefined')
        return 0;
    else
        return 1 + Math.min(getMinDepth(node.left), getMinDepth(node.right));
}

function getMaxDepth(node) {
    if (node === null || typeof node === 'undefined')
        return 0;
    else
        return 1 + Math.max(getMaxDepth(node.left), getMaxDepth(node.right));
}

//console.log(isTreeBalance(tree1));






function Graph() {
    var t = this;
    var adjMat = [];
    var vertices = [];

    t.vertices = vertices;
    t.adjMat = adjMat;

    t.addVertex = function(nodeVal) {
        vertices.push(nodeVal);

        for (var i = 0; i < vertices.length; i++) {
            adjMat[i] = adjMat[i] || [];

            for (var j = 0; j < vertices.length; j++) {
                if (!adjMat[i][j])
                    adjMat[i][j] = 0;
            }
        }
    }

    t.addEdge = function(fromVertex, toVertex, weight) {
        weight = weight || 1;

        fromIdx = vertices.indexOf(fromVertex);
        toIdx = vertices.indexOf(toVertex);

        adjMat[fromIdx][toIdx] = weight;
    }


    t.getEdges = function(vertex) {
        idx = vertices.indexOf(vertex);
        return adjMat[idx];
    }

    //get vertex index from a value
    t.getVertexIdx = function(vertex) {
        return vertices.indexOf(vertex);
    }


    //get vertex value from index
    t.getVertex = function(idx) {
        return vertices[idx];
    }


    t.getVertices = function() {
        return vertices;
    }
}

var g = new Graph();
g.addVertex(0);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);
g.addVertex(6);
g.addVertex(7);
g.addVertex(8);

g.addEdge(0, 5, 2);
g.addEdge(0, 1, 5);
g.addEdge(1, 2, 4);
g.addEdge(2, 3, 9);
g.addEdge(3, 4, 7);
g.addEdge(3, 5, 3);
g.addEdge(4, 0, 1);
g.addEdge(5, 4, 8);
g.addEdge(5, 2, 1);
//extra to create a dead end
g.addEdge(5, 6, 7);
g.addEdge(6, 7, 1);
g.addEdge(7, 8, 1);
g.addEdge(7, 4, 1);

//console.log(g.adjMat);


/*
	Given a directed graph, design an algorithm to find out whether there is a route be-
tween two nodes
*/
function isReachable(graph, n1, n2) {
    var stk = [];
    var state = {};

    for (var k in graph.vertices) {
        state[k] = 0; //0 means not visitted.
    }

    //lets do our loop
    var startIdx = graph.getVertexIdx(n1);
    var endIdx = graph.getVertexIdx(n2);

    var startVal = n1;
    stk.push(startVal);

    var res = [];

    while (stk.length > 0) {
        var curVal = stk.shift(); //remove first, means a queue , this is breadth first search (bfs)
        var edges = graph.getEdges(curVal);

        res.push(curVal);

        for (var i = 0; i < edges.length; i++) {
            if (edges[i] > 0) {
                var adjVal = graph.getVertex(i);

                if (i === endIdx) {
                    res.push(adjVal);
                    console.log('path', res);
                    return true;
                } else {
                    //connected
                    //mark as visitted
                    state[adjVal]++;

                    //push to stack only when visitted once
                    if (state[adjVal] === 1)
                        stk.push(adjVal);
                }
            }
        }
    }

    return false;
}

//console.log(isReachable(g, 6, 0));



/*
	Given a sorted (increasing order) array, write an algorithm to create a binary tree with
minimal height
*/
function constructMinimalBST(a, from, to) {
    from = from || 0;
    to = to || a.length;

    console.log(from, to);

    if (from > to) //ending condition
        return null;
    else if (from === to) {
        var n = new Node();
        n.val = a[from];

        return n;
    } else {
        var mid = parseInt((from + to) / 2);
        var midVal = a[mid];

        var n = new Node();
        n.val = midVal;

        n.left = constructMinimalBST(a, from, mid - 1);
        n.right = constructMinimalBST(a, mid + 1, to);

        return n;
    }
}



/*
var minimalHeight = new BinarySearchTree();
minimalHeight.root = constructMinimalBST([1, 2, 3, 4, 5]);
console.log(minimalHeight.root);
minimalHeight.printInOrder();
*/

/*
	Given a binary search tree, design an algorithm which creates a linked list of all the
nodes at each depth (eg, if you have a tree with depth D, you’ll have D linked lists)
*/
function formLinkedList(node, linkedlist, level) {
    linkedlist = linkedlist || [];
    level = level || 0;
    linkedlist[level] = linkedlist[level] || [];

    if (node != null)
        linkedlist[level].push(node.val);

    if (node.left != null)
        formLinkedList(node.left, linkedlist, level + 1);

    if (node.right != null)
        formLinkedList(node.right, linkedlist, level + 1);
}

var tree1 = constructTree([8, 3, 1, 6, 4, 7, 10, 14, 13]);
var listLevel = [];
formLinkedList(tree1.root, listLevel);
//console.log(listLevel);



/*
	Design an algorithm and write code to find the first common ancestor of two nodes
in a binary tree Avoid storing additional nodes in a data structure NOTE: This is not
necessarily a binary search tree
*/
function commonAncestor(root, n1, n2) {
    if (covers(root.left, n1) && covers(root.left, n2))
        return commonAncestor(root.left, n1, n2);

    if (covers(root.right, n1) && covers(root.right, n2))
        return commonAncestor(root.right, n1, n2);

    return root;
}

/*
	return true if node is a child of parent node called root.
*/
function covers(root, node) {
    //root is empty (dead end) then node is not found
    if (root === null)
        return false;

    //if root is node, then itself is the ancestor
    if (root == node)
        return true;

    return covers(root.left, node) || covers(root.right, node);
}


/*
	You are given a binary tree in which each node contains a value Design an algorithm
to print all paths which sum up to that value Note that it can be any path in the tree
- it does not have to start at the root
*/

function findSum(node, sum, buffer, level) {
    if (node === null)
        return;

    buffer = buffer || [];
    level = level || 0;

    var myBuffer = buffer.slice();
    myBuffer.push(node.val);

    console.log(node.val, sum, myBuffer, level);

    //check and print the sum form current level up
    var tmp = sum;

    for (var i = myBuffer.length - 1; i >= 0; i--) {
        tmp -= myBuffer[i];

        //print resule when find a sum
        if (tmp === 0)
            console.log('found', myBuffer.slice(i));
    }

    bufferLeft = myBuffer.slice();
    bufferRight = myBuffer.slice();

    findSum(node.left, sum, bufferLeft, level + 1);
    findSum(node.right, sum, bufferRight, level + 1);
}


var tree2 = constructTree([8, 3, 1, 6, 4, 7, 10, 14, 13]);
var tree3 = constructTree([2, 3, -4, 3, 1, 2]);
var sum = 5;
console.log(sum);
findSum(tree2.root, 24);