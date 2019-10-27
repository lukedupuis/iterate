# iterate
Streamlined asynchronous iteration

## Description
Iterates over a given array, calling a given function (callee) for each element of the array. The callee is passed the value of the array at the current index, a next function, and the current index.

The result of the callee may be passed into the next function, in order append the result of the callee at the current index to a second internal array. When the iteration is finished, the internal array is passed to the third parameter, which is a callback function.

The purpose is to be able to call the callee asynchronously.

### Parameters

    array: any
    callee: function(currentValue: any, next: function, index: number)
    callback: function(collectionOfResults: array)

### Returns

    void

## The Function

```javascript
const iterate = (array, callee, callback) => {
  try {
    var i = 0;
    var data = [];
    const each = i => callee(array[i], next, i);
    const next = d => { data.push(d); i++; i < array.length ? each(i) : callback(data); };
    each(i);
  } catch(err) { throw new Error(err); }
};
```

## Example

```javascript
const array = ['a', 'b', 'c'];

const callee = (d, next, i) => {
  setTimeout(() => {
    console.log(`Current index: ${i}`);
    console.log(`Value at current index: ${d}`);
    next(`Value at ${i}: ${d}`);
  }, 1000);
};

const callback = data => console.log(`---\r\n${data.join('\r\n')}`);

iterate(array, callee, callback);
```

### Output
    > Current index: 0
    > Value at current index: a
    > Current index: 1
    > Value at current index: b
    > Current index 2
    > Value at current index: c
    > ---
    > Value at 0: a
    > Value at 1: b
    > Vaule at 2: c