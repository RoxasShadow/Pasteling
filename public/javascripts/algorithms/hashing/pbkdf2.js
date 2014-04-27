Pasteling.hashing.pbkdf2 = (function() {
  var setup = function() {
    sjcl.random.startCollectors();
  };

  var hash = function(string, salt, iterations) {
    var hash = sjcl.misc.pbkdf2(string, salt, iterations);
    return sjcl.codec.hex.fromBits(hash);
  };

  var getRandomValues = function(length) {
    var values = sjcl.random.randomWords(length / 8, 0);
    return sjcl.codec.hex.fromBits(values);
  };

  return {
    setup          : setup,
    hash           : hash,
    getRandomValues: getRandomValues
  };
})();