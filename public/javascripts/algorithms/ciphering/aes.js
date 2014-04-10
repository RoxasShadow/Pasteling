Pasteling.ciphering.aes = (function() {
  var encrypt = function(text, key) {
    return CryptoJS.AES.encrypt(text, key);
  };

  var decrypt = function(text, key) {
    return CryptoJS.AES.decrypt(text, key);
  };

  var stringify = CryptoJS.enc.Utf8;

  return {
    encrypt  : encrypt,
    decrypt  : decrypt,
    stringify: stringify
  };
})();