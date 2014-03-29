define(function(require, exports) {
  return {
    useAlgorithm: function(algorithm) {
      this.algorithm = require('./ciphering/' + algorithm);
      this.stringify = this.algorithm.stringify;
      return this;
    },

    encrypt: function(text, key) {
      return this.algorithm.encrypt(text, key);
    },

    decrypt: function(text, key) {
      return this.algorithm.decrypt(text, key);
    }
  };

  require('./ciphering/aes');
});