//base class used to d otesting
var TestHandler = require("./test_handler.js");



function findMinInSortedRotatedArray(arr, low, high){
	if (typeof low == 'undefined')
		low = 0;

	if (typeof high == 'undefined')
		high = arr.length -1 ;

	var mid = Math.floor((low + high) / 2);

	var lowVal = arr[low];
	var highVal = arr[high];
	var midVal = arr[mid];

	if (high < low)
		return arr[0];

	if (low == high)
		return arr[low];

	if (midVal <= lowVal && midVal <= highVal)
		return midVal;

	if (highVal >  midVal)// 10, 2, *3*, 5, 6 
	{
		//low is greater than val, then the low is in left half
		//console.log('Left', lowVal, midVal, highVal);
		return findMinInSortedRotatedArray(arr, low, mid - 1);
	}		
	
	//console.log('Right', lowVal, midVal, highVal);
	return findMinInSortedRotatedArray(arr, mid + 1, high);
}


var testFindMinInSortedRotatedArray = new TestHandler({
	name : 'findMinInSortedRotatedArray',
	test : function (a) {
		var res;
		console.log('input', a);
		res = findMinInSortedRotatedArray(a);
		console.log('output', res);
		console.log("");
	},
	inputs : [
		[[1,2,3,4,5,6,7]],
		[[3, 4, 5, 1, 2]],
		[[5, 6, 7, 1, 2, 3, -4]],
		[[2, 3, 4, 5, 6, 7, 8, 1]]
	]
});
//testFindMinInSortedRotatedArray.run();

function findPermutationRecursion(arr, res){
	res = res || [];

	if (arr.length == 0)
		console.log(res);
	else{
		for (var i = 0; i < arr.length; i++){
			var newArr = arr.slice(i, i + 1);
			console.log(newArr, arr);
		}
	}
}

findPermutationRecursion('abcdef'.split(''));