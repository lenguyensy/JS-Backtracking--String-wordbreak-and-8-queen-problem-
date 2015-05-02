/*
	Design an algorithm and write code to remove the duplicate characters in a string 
	without using any additional buffer NOTE: One or two additional variables are fine 
	An extra copy of the array is not 
	FOLLOW UP
	Write the test cases for this method

	aaeeedffffdccbb


	test case:
	null, empty
	all dup
*/
function removeDups(str) {
    console.log('input:', str);

    str = str.split('');

    //loop, then check
    var idx = 0;

    for (var i = 0; i < str.length; i++) {
        var isduplicate = false;

        for (var j = 0; j < idx; j++) {
            if (str[j] == str[i]) {
                isduplicate = true;
                break;
            }
        }

        if (!isduplicate) {
            str[idx] = str[i];
            idx++;
        }
    }

    ///remove remaning white space.
    for (var i = idx; i < str.length; i++) {
        str[i] = '';
    }

    return str.join('');
}

console.log('removeDups', removeDups('aaeeedffffdccbb'));
console.log('removeDups', removeDups('aaaa'));
console.log('removeDups', removeDups('abcdef'));
console.log();

/**/
function isAnagram(a, b) {
    console.log('input', a, b);

    if (a.length != b.length)
        return false;

    //change to array to sort
    a = a.split('');
    b = b.split('');

    //sort
    a = a.sort();
    b = b.sort();


    return a.join('') === b.join('');
}

console.log('isAnagram', isAnagram('army', 'mary'));
console.log('isAnagram', isAnagram('god', 'dog'));
console.log('isAnagram', isAnagram('yeah', 'my'));
console.log();


/*
	Write a method to replace all spaces in a string with ‘%20’ 
*/
function replaceWhitespaceWithHex(str) {
    var a = str.split('');

    //count space
    var spaceCnt = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] == ' ')
            spaceCnt++;
    }

    //no space, no work needed
    if (spaceCnt === 0)
        return str;

    var end = str.length + spaceCnt * 2 - 1;
    var idx = str.length - 1;

    while (idx > 0) {
        if (a[idx] === ' ') {
            a[end] = '0';
            a[end - 1] = '2';
            a[end - 2] = '%';

            end -= 3;
        } else {
            a[end] = a[idx];
            end -= 1;
        }

        idx--;
    }

    console.log(str);
    console.log(a.join(''));
}

console.log(replaceWhitespaceWithHex('a b ddd e   '));

/*
	Given an image represented by an NxN matrix, where each pixel in the image is 4 
bytes, write a method to rotate the image by 90 degrees Can you do this in place?
*/
function rotate90(mat) {
    //go in diag up to half
    for (var i = 0; i < mat.length / 2; i++) {
        var first = i;
        var last = mat.length - i;
    }
}


/*
	Write an algorithm such that if an element in an MxN matrix is 0, its entire row and 
	column is set to 0 p
*/
function makeZero(a) {
    var newA = a.slice();
    var zeroRow = [];
    var zeroCol = [];

    //mark 0
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[0].length; j++) {
            if (a[i][j] === 0) {
                zeroRow[i] = 0;
                zeroCol[j] = 0;
            }
        }
    }

    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[0].length; j++) {
            if (zeroRow[i] === 0 || zeroCol[j] === 0)
                newA[i][j] = 0;
        }
    }

    console.log(a);
    console.log(newA);

    return newA;
}

makeZero([
    [1, 2, 3],
    [4, 0, 0],
    [9, 8, 5]
]);

/*
	Assume you have a method isSubstring which checks if one word is a substring of 
another Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using 
only one call to isSubstring (i e , “waterbottle” is a rotation of “erbottlewat”) 
 p
*/
function isRotation(s1, s2) {
    console.log(s1, s2);

    function isSubstring(a, b) {
        if (a && b)
            return a.indexOf(b) >= 0;
        else
            return false;
    }

    return isSubstring(s1 + s1, s2);
}

//console.log(isRotation('erbottlewat', 'waterbottle'));


function swap(a, from, to) {
    var tmp = a[from];
    a[from] = a[to];
    a[to] = tmp;
}

function permute(a, from) {
    from = from || 0;

    if (from == a.length) {
        console.log(a.join(''));
        return;
    }

    for (var i = from; i < a.length; i++) {
        swap(a, from, i);

        permute(a, from + 1);

        //backtrack
        swap(a, from, i);
    }
}
//permute('ABC'.split(''));


function mergeSort(a) {
    if (a.length <= 1)
        return a;

    var l = [],
        r = [],
        mid = parseInt(a.length / 2);

    for (var i = 0; i < a.length; i++) {
        if (i < mid)
            l.push(a[i]);
        else
            r.push(a[i]);
    }

    l = mergeSort(l.slice());
    r = mergeSort(r.slice());

    l = l || [];
    r = r || [];

    return merge(l.slice(), r.slice());
}

function merge(l, r) {
    var res = [];

    l = l || [];
    r = r || [];

    while (l.length > 0 || r.length > 0) {
        if (l.length > 0 && r.length > 0) {
            if (l[0] > r[0]) {
                res.push(r.shift());
            } else {
                res.push(l.shift());
            }
        } else if (l.length == 0) {
            //left is empty, push right
            res.push(r.shift());
        } else {
            //right is empty push left
            res.push(l.shift());
        }
    }

    return res;
}

console.log('merge sort input', [4, 3, 2, 1, 5, 6, 7]);
console.log('merge sort output', mergeSort([4, 3, 2, 1, 5, 6, 7]));


function quickSort(a) {
    if (a.length <= 1)
        return a;

    var less = [],
        more = [],
        pivot = a[0]; //always pick first as pivot.


    for (var i = 1; i < a.length; i++) {
        if (a[i] < pivot)
            less.push(a[i]);
        else
            more.push(a[i]);
    }

    //concat less, and pivot and more
    return concatArray(quickSort(less), [pivot], quickSort(more));
}

function concatArray() {
    var res = [];

    for (var i = 0; i < arguments.length; i++)
        for (var j = 0; j < arguments[i].length; j++)
            res.push(arguments[i][j]);

    return res;
}


console.log('quickSort input', [4, 3, 2, 1, 5, 6, 7]);
console.log('quickSort output', quickSort([4, 3, 2, 1, 5, 6, 7]));