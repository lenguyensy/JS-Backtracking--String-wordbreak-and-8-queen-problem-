function isRotation(str1, str2){	
	var tmp = str1 + str1;
	
	console.log(str1, str2, tmp, tmp.indexOf(str2));
	
	//check to see if str2 is a substr of str1
	return tmp.indexOf(str2) >= 0;
}

//isRotation('abcd', 'dabc');
isRotation('abcde', 'edabc');