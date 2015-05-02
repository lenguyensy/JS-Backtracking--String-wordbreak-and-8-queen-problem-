function TreeNode(){
	var t = this;
	t.parent = undefined;
	t.left = undefined;
	t.right = undefined;
	t.val = undefined;
}

function BSTree(){
	var t = this;
	t.root = new TreeNode();

	var addNode = function(val, node, parentNode){
		if (typeof node === 'undefined'){
			node = new TreeNode();
			node.val = val;
			node.parent = parentNode;
		}
		else{
			if (typeof node.val === 'undefined'){
				node.val = val;
				node.parent = parentNode;
			}
			else{
				var nextNode;
				if (val < node.val){
					if (typeof node.left === 'undefined')
						node.left = new TreeNode();

					nextNode = node.left;
				}
				else{
					if (typeof node.right === 'undefined')
						node.right = new TreeNode();

					nextNode = node.right;					
				}

				addNode(val, nextNode, node);
			}
		}
	}

	t.add = function(v){
		addNode(v, t.root, undefined);
		return t;
	};

	//traversal
	var inOrderTrav = function(node, fun){
		if (typeof node.left !== 'undefined')
			inOrderTrav(node.left, fun);

		if (typeof node.val !== 'undefined')
			fun.call(null, node.val);

		if (typeof node.right !== 'undefined')
			inOrderTrav(node.right, fun);
	}

	var preOrderTrav = function(node, fun){
		if (typeof node.val !== 'undefined')
			fun.call(null, node.val);

		if (typeof node.left !== 'undefined')
			preOrderTrav(node.left, fun);

		if (typeof node.right !== 'undefined')
			preOrderTrav(node.right, fun);
	}

	var postOrderTrav = function(node, fun){
		if (typeof node.left !== 'undefined')
			postOrderTrav(node.left, fun);

		if (typeof node.right !== 'undefined')
			postOrderTrav(node.right, fun);

		if (typeof node.val !== 'undefined')
			fun.call(null, node.val);
	}

	var getTraversal = function(order){
		switch(order.toLowerCase()){
			default:
			case 'in':
				return inOrderTrav;
				break;
			case 'pre':
				return preOrderTrav;
				break;
			case 'post':
				return postOrderTrav;
				break;
		}
	}

	t.print = function(order){
		getTraversal(order).call(null, t.root, console.log);
	}

	var isValid = function(node){
		return (typeof node.left === 'undefined' || (typeof node.left !== 'undefined' && node.left.val < node.val && isValid(node.left)))
		&& (typeof node.right === 'undefined' || (typeof node.right !== 'undefined' && node.right.val > node.val && isValid(node.right)));
	}

	t.isValid = function(){
		return isValid(t.root);
	}



	t.parseFromCSV = function(){}
}

var tree = new BSTree();
tree.add(5)
.add(6)
.add(7)
.add(8)
.add(4)
.add(3);
console.log(tree.root);
tree.print('in');

console.log('isvalid' , tree.isValid());