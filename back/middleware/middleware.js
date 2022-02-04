const { createHash } = require('crypto');

module.exports = {
    hash(string) {
        return createHash('sha256').update(string).digest('hex');
    }
}
