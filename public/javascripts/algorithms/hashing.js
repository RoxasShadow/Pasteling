Pasteling.hashing = (function() {
  var useAlgorithm = function(algorithm) {
    this.algorithm = Pasteling.hashing[algorithm];
  };

  var setup = function() {
    return this.algorithm.setup();
  };

  var hash = function(string, salt, iterations) {
    return this.algorithm.hash(string, salt, iterations);
  };

  var getRandomValues = function(length) {
    return this.algorithm.getRandomValues(length);
  };

  return {
    useAlgorithm   : useAlgorithm,
    setup          : setup,
    hash           : hash,
    getRandomValues: getRandomValues
  };
})();