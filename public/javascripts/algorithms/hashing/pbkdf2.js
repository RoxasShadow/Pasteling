Pasteling.hashing.pbkdf2 = (function() {
  var hash = function(text, salt, length, iterations) {
    var options = {
      keySize   : (length || 128) / 32,
      iterations: iterations || 90510
    };

    return CryptoJS.PBKDF2(text, salt, options);
  };

  var randomString = function(length) {
    return CryptoJS.lib.WordArray.random((length || 128) / 8);
  };

  return {
    hash        : hash,
    randomString: randomString
  };
})();