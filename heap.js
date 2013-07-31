/*
	author: Sy Le
	synle@synle.com
	
	Array implementation of Heap
*/

/*
	mode : min or max heap
	compareFunc : overwrite with your own comparison method.
*/
function Heap (mode, compareFunc){
	if (typeof mode == 'undefined') throw ('Constructor failed, please specify the heap mode : min heap or max heap');
	
	var t = this;
	var arr = [];//store the heap
	
	var lg = function(num){
		return Math.log(num) / Math.log(2) ;
	}
	
	var getParent = function(idx){
		//return arr[];
		return Math.floor((idx - 1) / 2);
	}
	
	var getChildren = function(idx){
		return [2 * idx + 1, 2 * idx + 2];
	}
	
	t.mode = mode;
	
	if (typeof compareFunc == 'undefined')
		t.compare = mode.toLowerCase() == 'max' ? function(a, b){return a > b} :  function(a,b){return a < b;};
	else
		t.compare = compareFunc;
	
	if (typeof swapFunc == 'undefined')	
		t.swap = function(a, b){
			var tmp = arr[a];
			arr[a] = arr[b];
			arr[b] = tmp;
		}
	else
		t.swap = swapFunc;
	
	t.add = function(val){
		var n = arr.length;
		var parent = getParent(n);
		
		//push it on to the array
		arr.push(val);
		
		//swap if not good
		while (n > 0 && t.compare(arr[n], arr[parent])){
			//swap itself with its parent
			t.swap(n, parent);
			
			//move one level up
			n = parent;
			parent = getParent(n);
		}
	}
	
	t.addList = function (inputArr){
		for (var i = 0; i < inputArr.length; i++)
			t.add(inputArr[i]);
	}
	
	t.getRoot = function (){
		return arr[0];
	}
	
	t.removeRoot = function(){
		var ret = arr.shift();
		
		var newList = JSON.parse(JSON.stringify(arr));
		arr = [];
		t.addList(newList);
		
		/*
		//better approach instead of adding everything
		var ret = arr.shift();		
		var last = arr.pop();
		
		arr.unshift(last);//replace root wiht the last elem.
		
		//doing the swap until things are looking good.
		var n = 0;
		var children = getChildren(n);
		
		while (children.length > 0 && children[0] < arr.length){
			var leftChild = arr[children[0]];
			var rightChild = arr[children[1]];
			
			//pick a larger child
			if (typeof rightChild != 'undefined' && t.compare(rightChild, leftChild)){
				t.swap(n,children[1]);
				n = children[1];
			}
			else{
				t.swap(n,children[0]);
				n = children[0];
			}
			
			children = getChildren(n);
		}
		*/
		
		return ret;
	}
	
	t.serialize  = function(){return arr;}
}

var maxheap = new Heap('max');
maxheap.addList([8,71,41,31,10,11,16,46,51,31,21,13]);

for (var i = 0; i < 5; i++){
	console.log('maxheap', maxheap.serialize());
	maxheap.removeRoot();
}
return;

var minheap = new Heap('min');
minheap.addList([8,71,41,31,10,11,16,46,51,31,21,13]);

console.log('maxheap', maxheap.serialize());
console.log('minheap', minheap.serialize());