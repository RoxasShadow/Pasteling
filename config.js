var config = {};

// Encryption algorithm to encrypt pastes. Available: aes256
config.algorithm  = 'aes256';

// Default length for encryption keys
config.keyLength  = 8;

// Default number of iterations for the selected encryption algorithm (if supported)
config.iterations = 90510;

// Mongodb connection data
config.db = {
  host: 'localhost',
  name: 'pasteling'
};

module.exports = config;