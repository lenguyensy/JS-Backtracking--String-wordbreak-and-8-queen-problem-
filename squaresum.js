/*
author: Sy Le
print all possible sum of square of a number, and print out the smallest as well.

eg:
input: 12

sample run
12 =  1 + 1 + 1 + 9
12 =  1 + 1 + 4 + 1 + 1 + 4
12 =  1 + 1 + 4 + 1 + 4 + 1
12 =  1 + 1 + 4 + 4 + 1 + 1
12 =  1 + 1 + 9 + 1
12 =  1 + 4 + 1 + 1 + 1 + 4
12 =  1 + 4 + 1 + 1 + 4 + 1
12 =  1 + 4 + 1 + 4 + 1 + 1
12 =  1 + 4 + 4 + 1 + 1 + 1
12 =  1 + 9 + 1 + 1
12 =  4 + 1 + 1 + 1 + 1 + 4
12 =  4 + 1 + 1 + 1 + 4 + 1
12 =  4 + 1 + 1 + 4 + 1 + 1
12 =  4 + 1 + 4 + 1 + 1 + 1
12 =  4 + 4 + 4
12 =  9 + 1 + 1 + 1


Minimum Length (3)
12 =  4 + 4 + 4
Maximum Length (6)
12 =  4 + 1 + 4 + 1 + 1 + 1

 */

function sumOfSquare(numToFind) {
	var minList = []; //list with minimum length
	var maxList = []; //list with maximum length
	var hashOptions = {}; //hash of options


	/*
	origNum : original number to find representation for
	num : current number left in the current recursion
	curList: current list of number that make up the num (sum of list members + num = origNum)
	 */
	function sumOfSquareRecursion(origNum, num, curList) {
		curList = curList || [];
		num = num || origNum;

		if (num === 0) {
			update(curList);
		}

		var max;
		for (var i = Math.floor(Math.sqrt(num)); i >= 1; i--) {
			if (i * i === num) {
				curList.push(i * i);
				update(curList);

				return; //num is a perfect square
			} else if (i * i < num) {
				max = i + 1;
				break;
			}
		}

		//after this max is greatest square that can be subtracted by num
		for (var i = 1; i < max; i++) {
			var newList = curList.slice();
			newList.push(i * i);
			sumOfSquareRecursion(origNum, num - i * i, newList);
		}

		//cb for the min
		if (origNum === num) {
			for (var k in hashOptions) {
				if (hashOptions[k]) {
					console.log(origNum + ' = ', k);
				}
			}

			console.log('\n\nMinimum Length', '(' + minList.length + ')');
			console.log(origNum + ' = ', minList.join(' + '));

			console.log('Maximum Length', '(' + maxList.length + ')');
			console.log(origNum + ' = ', maxList.join(' + '));
		}
	}

	/*
	handler used to update the minList, maxList and list of all options
	 */
	function update(curList) {
		//update minlist if neccessary
		if (curList.length <= minList.length || minList.length === 0) {
			minList = curList.slice(); //clone curlist and save it
		}

		//update maxlist if neccessary
		if (curList.length >= maxList.length) {
			maxList = curList.slice(); //clone curlist and save it
		}

		//save current one to the hash
		hashOptions[curList.join(' + ')] = true;
	}

	sumOfSquareRecursion(numToFind);
}

sumOfSquare(12);
