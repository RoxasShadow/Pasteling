Pasteling.ciphering = (function() {
  var useAlgorithm = function(algorithm) {
    this.algorithm = Pasteling.ciphering[algorithm];
    this.stringify = this.algorithm.stringify;
  };

  var encrypt = function(text, key) {
    return this.algorithm.encrypt(text, key);
  };

  var decrypt = function(text, key) {
    return this.algorithm.decrypt(text, key);
  };

  return {
    useAlgorithm: useAlgorithm,
    encrypt     : encrypt,
    decrypt     : decrypt
  };
})();