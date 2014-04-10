Pasteling.Post = (function() {
  return function(text, key, salt, lang) {
    this.text = text;
    this.key  = key;
    this.salt = salt;
    this.lang = lang;

    this.publicData = function() {
      return { text: this.text, lang: this.lang };
    };

    this.encrypt = function() {
      var hashing   = Pasteling.hashing;
      var ciphering = Pasteling.ciphering;
      var config    = Pasteling.config;

      this.salt = hashing.randomString(config.hashing.saltLength).toString();
      var key   = hashing.hash(this.key, this.salt, config.hashing.keyLength, config.hashing.iterations).toString();
      this.text = ciphering.encrypt(this.text, key).toString();
    };

    this.decrypt = function() {
      var hashing   = Pasteling.hashing;
      var ciphering = Pasteling.ciphering;
      var config    = Pasteling.config;

      var key   = hashing.hash(this.key, this.salt, config.hashing.keyLength, config.hashing.iterations).toString();
      this.text = ciphering.decrypt(this.text, key).toString(ciphering.stringify);
    };
  };
})();