Pasteling.hashing = (function() {
  var useAlgorithm = function(algorithm) {
    this.algorithm = Pasteling.hashing[algorithm];
  };

  var hash = function(text, salt, length, iterations) {
    return this.algorithm.hash(text, salt, length, iterations);
  };

  var randomString = function(length) {
    return this.algorithm.randomString(length);
  };

  return {
    useAlgorithm: useAlgorithm,
    hash        : hash,
    randomString: randomString
  };
})();