define(['aes'], function(CryptoJS, require, exports) {
  return {
    encrypt: function(text, key) {
      return CryptoJS.AES.encrypt(text, key);
    },

    decrypt: function(text, key) {
      return CryptoJS.AES.decrypt(text, key);
    },

    stringify: CryptoJS.enc.Utf8
  };
});