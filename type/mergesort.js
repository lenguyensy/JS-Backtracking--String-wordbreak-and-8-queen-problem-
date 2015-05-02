function MergeSort(array){
	if (array.length <= 1)
		return array;	
	else{		
		var mid = parseInt(array.length / 2);
		
		var left = [], right = [];		
		for (var i = 0; i < mid; i++)
			left.push(array[i]);
		for (var i = mid; i < array.length; i++)
			right.push(array[i]);			
			
		left = MergeSort(left);
		right = MergeSort(right);
		
		return Merge(left, right);
	}
}

function Merge(left, right){
	var listResult = [];
	
	
	while(left.length > 0 || right.length > 0){
		var val = null;
		
		if (left.length > 0 && right.length > 0){
			if (left[0] < right[0]){
				val = left.shift();
			}
			else{
				val = right.shift();
			}
		}
		else if (left.length > 0){
			val = left.shift();
		}
		else if (right.length > 0){
			val = right.shift();
		}
		
		if (val != null){
			listResult.push(val);	
		}
	}	
	
	return listResult;
}

var array = [99, 8,7 1,2,3,4,5,6];
MergeSort(array);