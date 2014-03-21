Pasteling
=========
An encrypted pastebin.

Features
--------
- ROFL-Scaling
- Modular (en|de)cryption algorithms
- Delivered with a cool text editor

Rly
---
I encrypt your data only when I receive them. So if in the meantime someone sniffs them, it's not my fault. Anyway, using TLS you should be safe enough.

Tips
----
- If you serve static resources though Apache, write a `.htaccess` file and perform caching and gzipping on them.


Install
-------
```
$ npm   install
$ npm   install -g bower
$ bower install
$ npm   start
```

[Demo](http://pasteling.giovannicapuano.net)
