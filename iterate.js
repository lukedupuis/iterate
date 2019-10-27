const iterate = (array, callee, callback) => {
  try {
    var i = 0;
    const data = [];
    const each = i => callee(array[i], next, i);
    const next = d => { data.push(d); i++; i < array.length ? each(i) : callback(data); };
    each(i);
  } catch(err) { throw new Error(err); }
};

module.exports = iterate;