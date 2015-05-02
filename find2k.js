function sumUpBest(array, sum){
	var hashDiff = {};
	
	for (var i = 0; i < array.length; i++){
		var diff = sum - array[i];
		
		console.log(i, array[i], diff, hashDiff);
		if (hashDiff[array[i]])
			return [array[i], hashDiff[array[i]]];
			
		hashDiff[diff] = array[i];
	}
	return false;
}

function sumUpToKHash(array, sum){
	var hashDiff = {};
	
	//find the zero
	for (var i = 0; i < array.length; i++){
		var diff = sum - array[i];
		
		hashDiff[diff] = i;
	
		for (var k in hashDiff){
			if (typeof k != 'undefined'){
				k = parseInt(k);
				if(diff + k == sum && i != hashDiff[k]){
					return [array[i], array[hashDiff[k]]];
				}
			}
		}
	}
	
	return false;
}


function sumUpToKHashAll(array, sum){
	var hashDiff = {};
	var res = [];
	
	//find the zero
	for (var i = 0; i < array.length; i++){
		var diff = sum - array[i];
		
		hashDiff[diff] = i;
	
		for (var k in hashDiff){
			if (typeof k != 'undefined'){
				k = parseInt(k);
				if(diff + k == sum && i != hashDiff[k]){
					res.push([array[i], array[hashDiff[k]]]);
				}
			}
		}
	}
	
	return res.length > 0 ? res : false;
}


var array = [9,1,5,8,3,7];
var sum = 13;
sumUpBest(array, sum);