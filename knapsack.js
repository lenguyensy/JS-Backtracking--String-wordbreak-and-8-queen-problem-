/**
	solve knapsacks using dynamic programming...
	live demo can be found at :
	http://jsbin.com/avUHobE/7

	
	inputs:
	maxWeight

	items = [
		{
			w : 15,//weight
			v : 1 //value
		}
	]

	outputs:
	{ resArray: 
	   [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	     [ 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10 ],
	     [ 0, 0, 0, 0, 40, 40, 40, 40, 40, 50, 50 ],
	     [ 0, 0, 0, 0, 40, 40, 40, 40, 40, 50, 70 ],
	     [ 0, 0, 0, 50, 50, 50, 50, 90, 90, 90, 90 ] ],
	  maxValue: 90,
	  items: 
	   [ { w: 5, v: 10 },
	     { w: 4, v: 40 },
	     { w: 6, v: 30 },
	     { w: 3, v: 50 } ],
	  path: [ 4, 2 ],
	  maxWeight: 10 }
*/
function solveKnapSack(maxWeight, items){
	var resArray = new Array(items.length + 1);

	//init resArray to be 0 when i = 0, don't take any item.
	for (var i = 0; i <= items.length; i++){
		resArray[i] = new Array(maxWeight + 1);
		resArray[i][0] = 0;	
	}
		

	//init resArray to be 0 when maxWeight is = 0
	for (var i = 0; i <= maxWeight; i++)
		resArray[0][i] = 0;


	//dynamic programing happening here
	for (var i = 1;i <= items.length; i++){//i referring to the current item to look at.
		for (var j = 0; j <= maxWeight; j++){//j referring to the current max weight
			var curItem = items[i - 1];
			var curVal1 = 0;//cur weight
			var curVal2 = 0;//i - 1 , j - curweight + curweight


			//if cur weight is less than max weight, then take cur value to be current item
			//calc v[i]c
			if (curItem.w <= j)
				curVal1 = curItem.v;

			//inherit
			if (curVal1 < resArray[i - 1][j])
				curVal1 = resArray[i - 1][j];

			//calc resArr[i - 1][j - items[i].w]
			var idx = 0;
			if (j - curItem.w > 0){
				idx = j - curItem.w;
				curVal2 = curItem.v + resArray[i - 1][idx];
			}

			//set current best
			resArray[i][j] = curVal1 > curVal2 ? curVal1 : curVal2;
		}
	}

	//figuring out the path
	var curIdx = maxWeight,
	path = [];
	for (var i = items.length; i > 0; i--){
		if (resArray[i][curIdx] === resArray[i - 1][curIdx]){
			curIdx = curIdx;
		}
		else{
			curIdx -= items[i - 1].w;
			path.push(i);
		}
	}
	

	//return result
	return {
		resArray: resArray,
		maxValue : resArray[items.length][maxWeight],
		items : items,
		path : path,
		maxWeight : maxWeight
	}
}



var res = solveKnapSack(10, [{w: 5, v: 10}, {w: 4, v: 40}, {w: 6, v: 30}, {w: 3, v: 50}]);

//print result array
console.log(res);	



var res = solveKnapSack(6, [{w: 4, v: 3}, {w: 3, v: 2}, {w: 2, v:4}, {w: 3, v: 4}]);

//print result array
console.log(res);	