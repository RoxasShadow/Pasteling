define(function(require) {
  return {
    keyLength: 32, // default key length when it is not given in input
    hashing  : {
      keyLength : 128, // default length for encrypted key
      saltLength: 64,  // length of the salt to hash the key
      iterations: 1000 // number of iterations for salting
    }
  };
});