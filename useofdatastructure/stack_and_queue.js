function sortStack(s) {
    var newStack = [];

    function peek(a) {
        try {
            return a[a.length - 1];
        } catch (ex) {
            return undefined;
        }
    }

    console.log(s);

    if (s.length == 0)
        return [];

    while (s.length > 0) {
        var tmp = s.pop();
        var newPeek = peek(newStack);

        while (newStack.length > 0 && tmp < newPeek) {
            s.push(newStack.pop());
        }

        newStack.push(tmp);
    }

    return newStack;
}


console.log(sortStack([1, 4, 3, 2, 5]));
console.log(sortStack([1]));
console.log(sortStack([]));