'use strict';

var fs = require('fs'),
	es = require('event-stream'),
	should = require('should');

require('mocha');

delete require.cache[require.resolve('../')];

var gutil = require('gulp-util'),
	gulpEncrypt = require('../');

describe('gulp-encrypt', function () {

	var expectedFileEncrypted = new gutil.File({
		path: 'test/expected/hello.txt',
		cwd: 'test/',
		base: 'test/expected',
		contents: fs.readFileSync('test/expected/hello.txt')
	});
	var expectedFileDecrypted = new gutil.File({
		path: 'test/fixtures/hello.txt',
		cwd: 'test/',
		base: 'test/fixtures',
		contents: fs.readFileSync('test/fixtures/hello.txt')
	});

	it('should encrypt the buffer', function (done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/hello.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.readFileSync('test/fixtures/hello.txt')
		});

		var stream = gulpEncrypt({
			key: 'S3cr3tK3y'
		});

		stream.on('error', function(err) {
			should.exist(err);
			done(err);
		});

		stream.on('data', function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			String(newFile.contents).should.equal(String(expectedFileEncrypted.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it('should decrypt the buffer', function (done) {

		var srcFile = new gutil.File({
			path: 'test/expected/hello.txt',
			cwd: 'test/',
			base: 'test/expected',
			contents: fs.readFileSync('test/expected/hello.txt')
		});

		var stream = gulpEncrypt({
			key: 'S3cr3tK3y',
			decrypt: true
		});

		stream.on('error', function(err) {
			should.exist(err);
			done(err);
		});

		stream.on('data', function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(String(expectedFileDecrypted.contents));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it('should error on stream', function (done) {

		var srcFile = new gutil.File({
			path: 'test/fixtures/hello.txt',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.createReadStream('test/fixtures/hello.txt')
		});

		var stream = gulpEncrypt({
			key: 'S3cr3tK3y'
		});

		stream.on('error', function(err) {
			should.exist(err);
			done();
		});

		stream.on('data', function (newFile) {
			newFile.contents.pipe(es.wait(function(err, data) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});
});
