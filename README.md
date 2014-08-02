# gulp-encrypt
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> gulp-encrypt plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-encrypt` as a development dependency:

```shell
npm install --save-dev gulp-encrypt
```

Then, add it to your `gulpfile.js`:

```javascript
var encrypt = require("gulp-encrypt");

gulp.src("./src/*.json")
	.pipe(encrypt({
		key: process.env.secretKey,
		decrypt: false || true
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### gulp-encrypt(options)

#### options.key
Type: `String`  
Default: `null`

#### options.decrypt
Type: `Boolean`  
Default: `false`

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-encrypt
[npm-image]: https://badge.fury.io/js/gulp-encrypt.png

[travis-url]: http://travis-ci.org/charliedowler/gulp-encrypt
[travis-image]: https://secure.travis-ci.org/charliedowler/gulp-encrypt.png?branch=master

[coveralls-url]: https://coveralls.io/r/charliedowler/gulp-encrypt
[coveralls-image]: https://coveralls.io/repos/charliedowler/gulp-encrypt/badge.png

[depstat-url]: https://david-dm.org/charliedowler/gulp-encrypt
[depstat-image]: https://david-dm.org/charliedowler/gulp-encrypt.png
