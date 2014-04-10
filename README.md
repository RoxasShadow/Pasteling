Pasteling
=========
An encrypted pastebin.

Features
--------
- ROFL-Scaling
- Modular (en|de)cryption and hashing algorithms
- Encryption with an user key or a random one
- Delivered with a cool text editor
- Read/write APIs
- Client-side ciphering (the server-side ciphering branch is available [here](https://github.com/RoxasShadow/Pasteling/tree/server-side))
- Minification of static resources

What branch I should use?
-------------------------
Well, the *client-side* version is of course the most secure. All data are encrypted in your computer and the server receive just the ciphered text.
The disvantage of this pratice is that the URL params will be long (id + salt + key).
If your data are not so sensible, and you want to get a short URL (aka, without the salt), the *server-side* version is what would to choose.

Obviously, this README refers to the client-side version. Check out the README in the other branch for informations about the server-side version.

Ciphering and hashing
---------------------
*Pasteling* (en|de)crypts pastes in *AES* and hashes keys in *PBKDF2*.
Algorithms configuration is available in `lib/javascripts/pasteling/config.js`.

For example, if you want to use a different ciphering algorithm, you have just to create an adapter in `lib/javascripts/algorithms/ciphering/`.
If you have used an external library, add it in `Gruntfile.js` and then select your adapter in `lib/javascripts/pasteling/config.js`.

Clients
-------
Not available yet.

JSON APIs
---------
`/api/new`   - POST - *text* (required), *lang* (optional) - Send a new encrypted paste

`/api/:id`   - GET  - Get an encrypted paste

`/api/langs` - GET  - Get a list of supported languages

The field *lang* requires one of the *name* you can find in `/api/langs`. Default is *Plain Text*.

Install
-------
```
$ npm   install
$ npm   install -g bower
$ npm   install grunt-cli
$ bower install
$ grunt
$ npm   start
```

[Demo](http://pasteling.giovannicapuano.net)
