var config = {};

// Encryption algorithm to encrypt pastes. Available: aes256
config.algorithm = 'aes256';

// Mongodb connection data
config.db = {
  host: 'localhost',
  name: 'test'
};

module.exports = config;