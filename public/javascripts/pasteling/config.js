Pasteling.config = (function() {
  return {
    algorithms: {
      ciphering: 'aes',
      hashing  : 'pbkdf2'
    },

    hashing: {
      keyLength : 128,   // (/32) hashed key size
      saltLength: 64,    // (/8)  salt size 
      iterations: 1000   // number of iterations for key hashing
    },

    keyLength: 32        // (/8)  key size when it is not given in input
  };
})();