//base
function LinkedList() {
    var t = this;
    t.val = null;
    t.next = null;

    t.printAll = function() {
        console.log(t.val);
        if (t.next != null)
            t.next.printAll();
        return '';
    }


    /*length, don't count last null*/
    t.length = function() {
        var i = 0;
        var node = t;
        if (t !== null) {
            while (node.next !== null) {
                i++;
                node = node.next;
            }
        }
        return i;
    }
}

function constructLinkedList(listinput) {
    var head;
    (function(input) {
        head = new LinkedList();
        var cur = head;

        for (var i = 0; i < input.length; i++) {
            cur.val = input[i];
            cur.next = new LinkedList();
            cur = cur.next;
        }
    })(listinput);
    return head;
}

var head = constructLinkedList([1, 2, 56, 7, 1, 2, 8, 56, 2, 2, 8, 9]);
var head2 = constructLinkedList([1, 2, 3, 4, 5, 4, 3, 2, 1]);


/*
	Write code to remove duplicates from an unsorted linked list 

	using a second list
*/
function removeDuplicate(node) {
    console.log('old list');
    node.printAll();

    //copy the first node
    var newHead = null;

    while (node !== null) {
        //traverse against new list to see if this is a dup
        var curNode = newHead;
        var isDup = false;
        while (curNode !== null) {
            if (curNode.val === node.val) {
                isDup = true;
                break;
            }

            if (curNode.next == null)
                break;

            curNode = curNode.next;
        }

        //not a dup, then copy data over
        if (isDup === false) {
            if (newHead == null) {
                newHead = new LinkedList();
                newHead.val = node.val;
            } else {
                curNode.next = new LinkedList();
                curNode.next.val = node.val;
            }
        }

        //next node
        node = node.next;
    }


    console.log('new list after removing duplicates');
    newHead.printAll();
    return newHead;
}

//removeDuplicate(head);



/*
	 Implement an algorithm to find the nth to last element of a singly linked list 

	 using 2 pointer
*/
function findNthToLast(head, n) {
    console.log('finding element', n);

    var node = head;
    var nextNode = head;
    var origN = n;

    if (head === null)
        return 'list is empty'; //list is null, no way to find the node

    //make nextNode move n steps ahead
    while (n > 0 && nextNode !== null) {
        nextNode = nextNode.next;
        n--; //subtract n
    }

    if (n > 0) {
        return 'List has less item than n (' + origN + ')';
    }

    while (nextNode != null) {
        nextNode = nextNode.next;
        node = node.next;
    }

    return node.val;
}

//head.printAll();
//console.log(findNthToLast(head, 3));
//console.log(findNthToLast(head, 23));
//console.log(findNthToLast(null, 2));


/*
	Implement an algorithm to delete a node in the middle of a single linked list, given 
only access to that node 

	NOTE: THIS IS DOING THE TRAVERSE AND FIND NODE

	two pointers, 
	slow move 1 step
	fast move 2 step
*/
function deleteMiddle(head) {
    if (head === null)
        return 'list is empty';

    if (head.length() % 2 === 0)
        return "even number of element, can't delete middle node";

    var slow = head;
    var fast = head.next;

    /*1,2,3,4,5,null
   	slow = 1
   	fast = 2

   	slow = 2
	fast = null	
   	*/

    var beforeMid;
    while (fast !== null) {
        try {
            fast = fast.next.next;
        } catch (ex) {
            break;
        }
        beforeMid = slow;
        slow = slow.next;
    }

    beforeMid.next = slow.next;
    slow = null;


    return head;
}



function deleteNode2(head) {
    if (head === null)
        return 'list is empty';

    if (head.length() % 2 === 0)
        return "even number of element, can't delete middle node";

    var slow = head;
    var fast = head.next;

    while (fast !== null) {
        try {
            fast = fast.next.next;
        } catch (ex) {
            break;
        }
        slow = slow.next;
    }

    //condition
    if (slow == null && slow.next == null) {
        return "cant delete middle.";
    }

    //slow is now mid
    slow.val = slow.next.val;
    var nextSlow = slow.next;
    slow.next = nextSlow.next;
    nextSlow = null;


    return head;
}



/*
head2.printAll();
var newHead2 = deleteNode2(head2);
if (newHead2.printAll)
    head2.printAll();
else
    console.log(newHead2);

*/



/*
	You have two numbers represented by a linked list, where each node contains a sin-
gle digit The digits are stored in reverse order, such that the 1’s digit is at the head of
the list Write a function that adds the two numbers and returns the sum as a linked
list
EXAMPLE
Input: (3 -> 1 -> 5), (5 -> 9 -> 2)
Output: 8 -> 0 -> 8
*/

var h1 = constructLinkedList([3, 1, 5]);
var h2 = constructLinkedList([5, 9, 5]);

function additionList(n1, n2) {
    var carry = 0;
    var resHead = new LinkedList();
    var curNode = resHead;

    console.log('num 1');
    n1.printAll();

    console.log('num 2');
    n2.printAll();

    while (n1.val !== null || n2.val !== null) {
        var exp1 = 0,
            exp2 = 0,
            res = 0;

        //next traverse
        if (n1 !== null) {
            exp1 = n1.val;
            n1 = n1.next;
        }


        if (n2 !== null) {
            exp2 = n2.val;
            n2 = n2.next;
        }

        res = exp1 + exp2 + carry;

        carry = 0; //reset carry

        if (res >= 10) {
            carry = 1;
            res -= 10;
        }

        //add res to list
        curNode.val = res;
        curNode.next = new LinkedList();
        curNode = curNode.next;
    }

    if (carry > 0) {
        curNode.val = carry;
    }

    console.log('res');
    resHead.printAll();

    return resHead;
}


//additionList(h1, h2);



var h1 = constructLinkedList([1, 2, 3, 4, 5, 6]);

function reverseList(h) {
    var n = h;
    var prev = null;
    var tmp;

    console.log('before');
    h.printAll();

    //doing iterative first
    while (n != null && n.val != null) {
        //store the next
        tmp = n.next;

        //swap next pointer
        n.next = prev;
        prev = n;

        //resume
        n = tmp;
    }
    h = prev;
    console.log('after reverse');
    h.printAll();
}
reverseList(h1);


//

var h1 = constructLinkedList([1, 2, 3, 4, 5, 3]); //loop is at 3

/*
	Given a circular linked list, implement an algorithm which returns node at the begin-
ning of the loop
DEFINITION
Circular linked list: A (corrupt) linked list in which a node’s next pointer points to an
earlier node, so as to make a loop in the linked list
EXAMPLE
Input: A -> B -> C -> D -> E -> C [the same C as earlier]
Output: C


NOTE: because js doesnt support comparison of pointer, so the value will be checked against each other isntead
*/
function findLoop(n) {
    var slow = n;
    var fast = n;

    while (fast != null && slow != null) {

    }
}
findLoop(h1);