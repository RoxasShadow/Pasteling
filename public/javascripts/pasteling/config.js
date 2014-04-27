Pasteling.config = (function() {
  return {
    algorithms: {
      ciphering: 'aes',
      hashing  : 'pbkdf2'
    },

    hashing: {
      saltLength: 8,
      iterations: 6400
    },

    keyLength: 8 // used when is not given an encryption key
  };
})();