/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */
 
var crypto = require('crypto');

function AES256CBC() {
  this.encrypt = function(text, key) {
    var cipher    = crypto.createCipher('aes-256-cbc', key);
    var encrypted = cipher.update(text, 'utf8', 'hex');
    return encrypted + cipher.final('hex');
  };

  this.decrypt = function(text, key) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    try {
      var decrypted = decipher.update(text, 'hex', 'utf8');
      return decrypted + decipher.final('utf8');
    }
    catch(err) {
      return new Error('invalid key');
    }
  };
}

module.exports = AES256CBC;