/*
	find unique number in list of numbers which repeats twice except for 1
*/

/*
	hash approach using a hash, then keep track of a sum coutn

	space : O(n)
	complex : O(n)
*/
function oddManOut(arr){
	var h = {};
	var numtofind = 0;

	console.log(arr);
	for (var i = 0; i < arr.length; i++){
		var num = arr[i];

		//h contains num, exclude in from the sum
		if (h[num] === true){
			numtofind -= num;
		}
		else{
			numtofind += num;
			h[num] = true;
		}
	}

	console.log(numtofind);
	return numtofind;
}

function xor(a,b){
	return (a || b) && !(a && b);
}

function oddManOutXOR(arr){

}

console.log(xor(false, false));
console.log(xor(true, false));
console.log(xor(false, true));
console.log(xor(true, true));

oddManOut([1,2,3,4,5,6,7,6,2,3,4,5,1]);