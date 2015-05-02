/*
violate if
At least 2A
3 L in a row

input: str
sample run:
input: ALOLA
true

input: ALLLOOO
true

input: ALOLOOLLL
true

input: AAOOOLOL
true

input:
false

input: AOIEOIWQY
invalid

input: ALOOOLOOL
false

input: LOLOOLLOOA
false

input: ALOLOOLLOO
false

input: OOOO
false

input: AOOOOO
false
 */
function isViolate(str) {
	str = str.toUpperCase();

	console.log('\ninput:', str);

	var prevL = -1;
	var absCnt = 0;
	if (str.length === 0) {
		return false;
	}

	for (var i = 0; i < str.length; i++) {
		var cur = str[i];

		switch (cur) {
		case 'A':
			absCnt++;
			if (absCnt >= 2)
				return true;
			break;

		case 'L':
			if (prevL === -1)
				prevL = i;
			else if (prevL === i - 2)
				return true;
			break;

		case 'O':
			prevL = -1; //revert back to -1
			break;

		default:
			return 'invalid';
			break;
		}
	}
	return false;
}


//violated cases
console.log(isViolate('ALOLA'));
console.log(isViolate('ALLLOOO'));
console.log(isViolate('ALOLOOLLL'));
console.log(isViolate('AAOOOLOL'));
console.log(isViolate(''));
console.log(isViolate('AOIEOIWQY'));


//non-violated cases.
console.log(isViolate('ALOOOLOOL'));
console.log(isViolate('LOLOOLLOOA'));
console.log(isViolate('ALOLOOLLOO'));
console.log(isViolate('OOOO'));
console.log(isViolate('AOOOOO'));
