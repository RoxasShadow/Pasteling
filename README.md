Pasteling
=========
An encrypted pastebin.

Features
--------
- ROFL-Scaling
- Modular (en|de)cryption algorithms
- Encryption with an user key or a random one
- Delivered with a cool text editor

Rly
---
I encrypt your data only when I receive them. So if in the meantime someone sniffs them, it's not my fault. Anyway, using TLS you should be safe enough.

JSON APIs
---------
`/api/new`      - POST - *text* (required), *lang* (optional), *key* (optional) - Send a new paste

`/api/:key/:id` - GET  - Get a paste

`/api/langs`    - GET  - Get a list of supported languages

The field *lang* requires one of the *name* you can find in `/api/langs`. Default is *Plain Text*.

Tips
----
In order to improve performance, enable caching and gzip compression when you serve static resources.

Install
-------
```
$ npm   install
$ npm   install -g bower
$ bower install
$ npm   start
```

[Demo](http://pasteling.giovannicapuano.net)
