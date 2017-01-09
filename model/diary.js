const AV = require('../utils/av-weapp-min.js');

class Diary extends AV.Object {
    get content() {
        return this.get('content');
    }
    get title() {
        return this.get('title');
    }
}

AV.Object.register(Diary);
module.exports = Diary;