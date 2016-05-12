var brocWriter = require('broccoli-writer');
var replace = require('replace');
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

            console.log(self.options);
            console.log(require('util').inspect(srcDir, { depth: null }));

			replace({
				regex: "\uFEFF",
				replacement: "",
				paths: [srcDir + self.options],
				silent: false
			});
		});
};
