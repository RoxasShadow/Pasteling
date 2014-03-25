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

function Security(module) {
  var that = this;

  this.encrypt = function(text, key) {
    return module.encrypt(text, key);
  };

  this.decrypt = function(text, key) {
    return module.decrypt(text, key);
  };

  this.randomKey = function(length) {
    return crypto.randomBytes(length).toString('hex');
  };

  this.hash = function(key, salt, length, iterations) {
    salt = !salt || !salt.trim() ? that.randomKey(128) : salt;
    return {
      key : crypto.pbkdf2Sync(key, salt, iterations, length).toString('hex'),
      salt: salt
    };
  };
}

module.exports = Security;