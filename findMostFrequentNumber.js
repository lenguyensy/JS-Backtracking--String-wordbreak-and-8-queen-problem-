/*
	author: Sy Le
	synle@synle.com
	
	Find the nth most frequent number in the array.
	
	This approach use a max heap to return the n account.
	The complexity of the function below is O(n).
	
	Example:
	Input:
		arr [ 5, 6, 7, 7, 8, 10, 10, 2, 5, 6, 8, 5, 5, 5, 5, 6, 6, 6 ]
		k 3

  
	Output:
		[ { val: '5', count: 6 },
		  { val: '6', count: 5 },
		  { val: '7', count: 2 } ]
*/
function FindMostFrequentNumber(arr, numberOfReturn){
	if (numberOfReturn <= 0) return [];
	
	var hashCount = {};//map val to count
	
	//get the count
	for (var i = 0; i < arr.length; i++){
		hashCount[arr[i]] = hashCount[arr[i]] || 0;
		hashCount[arr[i]]++;
	}
	
	//heapify, and reverse hash count
	var maxHeapFrequency = new Heap('max', function(a, b){
		//compare function
		if (arr.length > 1)
			return a.count > b.count;
		else
			return true;
	});
	
	for (var k in hashCount){
		if (typeof hashCount != 'undefined'){
			maxHeapFrequency.add({val: k, count : hashCount[k]});
		}
	}
	
	//prepare ret;
	var ret = [];
	
	while (numberOfReturn > 0){
		numberOfReturn--;
		ret.push(maxHeapFrequency.removeRoot());
		
		if (maxHeapFrequency.isEmpty())
			break;
	}
	
	return ret;
}

//heap
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
	
	
	t.swap = function(a, b){
		var tmp = arr[a];
		arr[a] = arr[b];
		arr[b] = tmp;
	}
	
	
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
	
	
	/*get an object at idx*/
	t.get = function(idx){
		return arr[idx];
	}
	
	t.removeRoot = function(){
		var ret = arr.shift();
		
		var newList = JSON.parse(JSON.stringify(arr));
		arr = [];
		t.addList(newList);
		
		return ret;
	}
	
	t.isEmpty = function(){
		return arr.length == 0;
	}
	
	t.serialize  = function(){return arr;}
}

//sample run
var arr = [5,6,7,7,8,10,10,2,5,6,8, 5, 5, 5, 5, 6,6,6];
var k = 3;

console.log('Array', arr);
console.log('K', k);
console.log(FindMostFrequentNumber(arr, k));