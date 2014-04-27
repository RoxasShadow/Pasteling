Pasteling.Post = (function() {
  return function(data, key, salt, lang) {
    this.data = data;
    this.key  = key;
    this.salt = salt;
    this.lang = lang;

    this.publicData = function() {
      return {
        data: this.data,
        lang: this.lang
      };
    };

    this.encrypt = function() {
      var hashing   = Pasteling.hashing;
      var ciphering = Pasteling.ciphering;
      var config    = Pasteling.config;

      this.salt = hashing.getRandomValues(config.hashing.saltLength);
      var key   = hashing.hash(this.key, this.salt, config.hashing.iterations);
      this.data = ciphering.encrypt(key, this.data.text);
    };

    this.decrypt = function() {
      var hashing   = Pasteling.hashing;
      var ciphering = Pasteling.ciphering;
      var config    = Pasteling.config;

      var key        = hashing.hash(this.key, this.salt, config.hashing.iterations);
      this.data.text = ciphering.decrypt(key, this.data);
    };
  };
})();