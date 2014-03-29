define(['pbkdf2'], function(CryptoJS, require, exports) {
  return {
    hash: function(text, salt, length, iterations) {
      var options = {
        keySize   : (length || 128) / 32,
        iterations: iterations || 90510
      };

      return CryptoJS.PBKDF2(text, salt, options);
    },

    random: function(length) {
      return CryptoJS.lib.WordArray.random((length || 128) / 8);
    }
  };
});