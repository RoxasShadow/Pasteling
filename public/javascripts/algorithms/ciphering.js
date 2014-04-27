Pasteling.ciphering = (function() {
  var useAlgorithm = function(algorithm) {
    this.algorithm = Pasteling.ciphering[algorithm];
    this.stringify = this.algorithm.stringify;
  };

  var encrypt = function(key, text) {
    return this.algorithm.encrypt(key, text);
  };

  var decrypt = function(key, params) {
    return this.algorithm.decrypt(key, params);
  };

  return {
    useAlgorithm: useAlgorithm,
    encrypt     : encrypt,
    decrypt     : decrypt
  };
})();