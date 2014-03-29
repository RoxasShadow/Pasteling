define(function(require, exports) {
  return {
    useAlgorithm: function(algorithm) {
      this.algorithm = require('./hashing/' + algorithm);
      return this;
    },

    hash: function(text, salt, length, iterations) {
      return this.algorithm.hash(text, salt, length, iterations);
    },

    random: function(length) {
      return this.algorithm.random(length);
    }
  };

  require('./hashing/pbkdf2');
});