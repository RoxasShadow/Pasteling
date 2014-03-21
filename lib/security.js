/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

function Security(module) {
  this.encrypt = function(text, key) {
    return module.encrypt(text, key);
  };

  this.decrypt = function(text, key) {
    return module.decrypt(text, key);
  };
}

module.exports = Security;