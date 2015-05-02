function LinkedList(){
	var t = this;
	t.val = null;
	t.next = null;
	
	t.printAll = function(){
		console.log(t.val);
		if (t.next != null)
			t.next.printAll();
		return '';
	}
}


//init linked list.
var listinput = [1, 2, 56, 7, 9, 7, 8, 5555, 32432, 6756, 232];
var head;
(function(input){
	head = new LinkedList();
	var cur = head;
	
	for (var i = 0; i < input.length; i++){	
		cur.val = input[i];
		cur.next = new LinkedList();
		cur = cur.next;
	}
})(listinput);


//traverse linkedlist
var traverseList = function(head){
	var cur = head;
	while(cur.next != null){
		console.log(cur.val);
		cur = cur.next;
	}
}

var getMiddle = function(head){
	var slow = head;
	var fast = head;
	
	while(fast != null && fast.next != null){
		if (fast.next.next == null)
			break;
		slow = slow.next;
		fast = fast.next.next;
	}
	
	return slow;
}

var clone = function(o){
	var newO = {};
	
	for (var k in o)
		newO[k] = o[k];
	
	return newO;
};

var reverseLinkedList = function(head){
	var cur = head;
	var prev = null;
	
	while(cur != null){
		//save next
		var next = cur.next;
		
		//reverse next
		cur.next = prev;
		
		//swap prev to cur
		prev = cur;
		
		//swap cur to next
		cur = next;
	}
	
	return prev;
}


var isLoop = function(head){
	var slow = head;
	var	fast = head;
	
	while(fast.next != null && fast.next.next != null){
		slow = slow.next;
		fast = fast.next.next;
		
		if (slow == fast)
			return true;
	}	
	
	return false;
}