var config = {};

// Encryption algorithm to encrypt pastes. Available: aes256
config.algorithm = 'aes256';

// Default length for encryption keys
config.keyLength = 8;

// Default number of iterations for encryption algorithms
config.iterations = 12;

// Mongodb connection data
config.db = {
  host: 'localhost',
  name: 'test'
};

module.exports = config;