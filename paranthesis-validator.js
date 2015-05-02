/*
	author : Sy Le
	validate if a set of paranthesis closing are matching
*/
function validateMatchingParanthesis(paran){
	var s = [];
	var last = "";
	var pairParan = "  ()[]{}";

	for (var i =0; i < paran.length; i++){
		var curChar = paran[i];

		//3 scenario

		//1 null (or first time), then push to stack
		if (last === ""){
			last = curChar;
			s.push(curChar);
		}
		else{
			var matching = Math.abs(pairParan.indexOf(last) - pairParan.indexOf(curChar)) == 1;

			//2 matching, pop the the last two, and set last being the second one popped
			if (matching){
				//remove the last pair
				s.pop();

				//if lenght is greater than 1, then set last being the last one
				last = s.length > 0 ? s[s.length - 1] : "";
			}
			else{
				//not matching, keep pushing
				last = curChar;
				s.push(last);
			}
		}
		console.log(s, last);
	}

	console.log(paran, s.length == 0);

	return s.length > 0;
}

validateMatchingParanthesis("{{{[[[((()))]]]}}}");
validateMatchingParanthesis("[]{}()");
validateMatchingParanthesis("{{(([[]]))}}");