Pasteling
=========
An encrypted pastebin.

Features
--------
- ROFL-Scaling
- Modular (en|de)cryption algorithms
- Encryption with an user key or a random one
- Delivered with a cool text editor
- Read/write APIs

Clients
-------
- [pasteling.rb](https://gist.github.com/RoxasShadow/9708419)
- [pasteling.sh](https://gist.github.com/Robertof/9717274)

JSON APIs
---------
`/api/new`      - POST - *text* (required), *lang* (optional), *key* (optional) - Send a new paste

`/api/:key/:id` - GET  - Get a paste

`/api/langs`    - GET  - Get a list of supported languages

The field *lang* requires one of the *name* you can find in `/api/langs`. Default is *Plain Text*.

Warning
-------
This version of Pasteling performs encryption in the server side and is far to be totally safe.
If you need more security, choose the [client-side](https://github.com/RoxasShadow/Pasteling/tree/client-side) version.

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
