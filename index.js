var brocWriter = require('broccoli-writer');
var replace = require('replace');
var fs = require('fs-extra');

module.exports = RemoveBom;
RemoveBom.prototype = Object.create(brocWriter.prototype);
RemoveBom.prototype.constructor = RemoveBom;
RemoveBom.prototype.description = 'remove BOM from js files';

function RemoveBom(inTree, options) {
	if (!(this instanceof RemoveBom)) {
		return new RemoveBom(inTree, options);
	}
	this.inTree = inTree;
	this.options = options || {};
}

RemoveBom.prototype.write = function(readTree, destDir) {
	var self = this;

	return readTree(this.inTree)
		.then(function(srcDir) {
			try {
				replace({
					regex: "\uFEFF",
					replacement: "",
					paths: [srcDir + self.options],
					silent: false
				});
				fs.copySync(srcDir + self.options, destDir + self.options);
				if (fs.existsSync(srcDir + self.options.replace('.js', '.map'))) {
					fs.copySync(srcDir + self.options.replace('.js', '.map'), destDir + self.options.replace('.js', '.map'));
				}

			} catch (err) {
				console.error(err);
			}
		});
};
