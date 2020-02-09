let self = module.exports = {
  diffObject: (options) => {
    const a = options.a;
    const b = options.b;
    if(typeof(a) !== typeof(b) || Array.isArray(a) !== Array.isArray(b)) {
      // they do not have the same type (including one is an array while the other is not)
      return false;
    } else if (Array.isArray(a)) {
      if(a.length !== b.length) {
        return false;
      }

      if(options.sortArrays) {
        a.sort();
        b.sort();
      }

      // go through each item in the array and use this compare method
      for(let i = 0; i < a.length; i++) {
        if(!self.diffObject({
          a: a[i],
          b: b[i],
          sortArrays: options.sortArrays
        })) {
          return false
        }
      }

      // if the array never returned false than it is true
      return true;
    } else if (typeof(a) === 'object') {
      // compare two objects, this means:
      // 1. Make sure each property in a is in b
      // 2. Make sure each property in b is in a (in case it has extra props)
      // 3. Make sure the properties have equivalent values (by calling this function)

      for (var prop in a) {
        if (a.hasOwnProperty(prop)) {
          if(b.hasOwnProperty(prop)) {
            // both objects have the same property
            if(!self.diffObject({
              a: a[prop],
              b: b[prop],
              sortArrays: options.sortArrays
            })) {
              return false
            }
          } else {
            // a has the property but b does not
            return false
          }
        }
      }

      for (var prop in b) {
        if (b.hasOwnProperty(prop) && !a.hasOwnProperty(prop)) {
          // b has the property but a does not
          return false
        }
      }

      // never was different so they must be equal
      return true;
    } else {
      // if it is a primitive values imply return the equality
      return a === b;
    }
  },
  diffArray: (options) => {
    // Credit: https://stackoverflow.com/a/33034768
    const { firstArray, secondArray } = options;
    let union = firstArray.filter(x => secondArray.includes(x));
    let firstArrayExclusive = firstArray.filter(x => !secondArray.includes(x));
    let secondArrayExclusive = secondArray.filter(x => !firstArray.includes(x));
    return {
      union,
      firstArrayExclusive,
      secondArrayExclusive
    }
  }
}
