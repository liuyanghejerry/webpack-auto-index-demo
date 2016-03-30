require('./common/common-a.js');
require('./common/common-b.js');

console.log('vendor.js');

module.exports = {
  lodash: require('lodash')
};