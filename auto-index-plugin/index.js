var lodash = require('lodash');
var fs = require('fs');
var path = require('path');

// TODO: handle async chunks
// TODO: handle chunks with hash
// TODO: better HTML template, probably from a file
// TODO: rules to generate HTML name and path
// TODO: reports or other debug infos
// TODO: unit tests?

var htmlTemplate = '<html><body>$scripts</body></html>';
var scriptTemplate = '<script src="$src"></script>';

function AutoIndexPlugin(options) {
  this.opts = options;
}

AutoIndexPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin("emit", function(compilation, callback) {
    var statsObj = compilation.getStats().toJson();
    // fs.writeFileSync(path.resolve(compilation.options.output.path, 'stats.json'), JSON.stringify(statsObj));
    lodash.forEach(compilation.options.entry, function(v, k) {
      _genEntryHtml(k, compilation.options.output.path, statsObj);
    });

    callback();
  });
};


function _genEntryHtml(target, distDir, statsObj) {
  var mappedChunks = {};

  statsObj.chunks.forEach(function(chunk) {
    mappedChunks[chunk.id] = chunk;
  });

  var entry = lodash.find(mappedChunks, function(chunk) {
    return chunk.names.indexOf(target) > -1;
  });

  var chunkList = _trackAllParents(entry, mappedChunks);

  var files = chunkList.map(function(chunk) {
    return chunk.files;
  });

  files = lodash.uniq(lodash.flatten(files));

  // TODO: find out a real solution for the target file
  // instead of simple concat
  files.push(target+'.js');

  files = files.map(function(file) {
    return scriptTemplate.replace('$src', file);
  });

  var html = htmlTemplate.replace('$scripts', files.join('\n'));

  fs.writeFileSync(path.resolve(distDir, target+'.html'), html, 'utf8');
}

// recursively find all parents and put them by order
function _trackAllParents(chunk, mappedChunks) {
  var chunkList = [];
  chunk.parents.forEach(function(parentId) {
    var parentChunk = mappedChunks[parentId];
    chunkList = chunkList.concat(_trackAllParents(parentChunk, mappedChunks));
    chunkList.push(parentChunk);
  });
  return chunkList;
}

module.exports = AutoIndexPlugin;
