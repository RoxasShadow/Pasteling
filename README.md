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

What branch I should use?
-------------------------
Well, the *client-side* version is of course the most secure. All data are encrypted in your computer and the server receive just the ciphered text.
The disvantage of this pratice is that the URL params will be long (id + salt + key).
If your data are not so sensible, and you want to get a short URL (aka, without the salt), the *server-side* version is what would to choose.

Obviously, this README refers to the client-side version. Check out the README in the other branch for informations about the server-side version.

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
$ bower install
$ npm   start
```

[Demo](http://pasteling.giovannicapuano.net)
