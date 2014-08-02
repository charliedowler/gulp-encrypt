var through = require('through2'),
	gutil = require('gulp-util'),
	encrypt = require('cf-encrypt');

module.exports = function (param) {
	'use strict';

	// if necessary check for required param(s), e.g. options hash, etc.
	if (!param) {
		throw new gutil.PluginError('gulp-encrypt', 'No param supplied');
	}

	// see 'Writing a plugin'
	// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
	function gulpEncrypt(file, enc, callback) {
		/*jshint validthis:true*/

		// Do nothing if no contents
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {

			// http://nodejs.org/api/stream.html
			// http://nodejs.org/api/child_process.html
			// https://github.com/dominictarr/event-stream

			// accepting streams is optional
			this.emit('error',
				new gutil.PluginError('gulp-encrypt', 'Stream content is not supported'));
			return callback();
		}

		// check if file.contents is a `Buffer`
		if (file.isBuffer()) {

			// manipulate buffer in some way
			// http://nodejs.org/api/buffer.html			
			var encrypted = encrypt[(param.decrypt ? 'decrypt' : 'encrypt')](param.key, file.contents.toString(), 'hex');
			file.contents = new Buffer(encrypted);

			this.push(file);

		}		
		return callback();
	}

	return through.obj(gulpEncrypt);
};
