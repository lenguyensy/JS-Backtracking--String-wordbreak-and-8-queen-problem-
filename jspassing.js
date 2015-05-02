var a = 10;
function add(val){
	val += 10;
}

console.log('add');
console.log(a);
add(a)
console.log(a);


var o = {
	a : 10,
	b : 22
}

function subtract(obj){
	obj.a = 99;
}

console.log('subtract');
console.log(o);
subtract(o)
console.log(o);


var o = {
	a : 10,
	b : 22
}

function multiply(obj){
	obj = {
		c:88,
		d:77
	}
}

console.log('multiply');
console.log(o);
multiply(o);
console.log(o);