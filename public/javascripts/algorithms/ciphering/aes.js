Pasteling.ciphering.aes = (function() {
  var encrypt = function(key, text) {
    var data = JSON.parse(sjcl.encrypt(key, text));
    
    return JSON.stringify({
      iv  : data.iv,
      salt: data.salt,
      ct  : data.ct
    });
  };

  var decrypt = function(key, params) {
    return sjcl.decrypt(key, JSON.stringify(params));
  };

  return {
    encrypt: encrypt,
    decrypt: decrypt
  };
})();