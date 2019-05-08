const EMOJIS = require('../config/emojis.json').emoji;

const ALIAS_PREFIX = 'alias:'

const getEmojiUrl = (emojiName) => {
    let strippedEmojiName = emojiName.substring(1, emojiName.length - 1);
    let emojiUrl = null;
    while (!emojiUrl) {
        emojiUrl = EMOJIS[strippedEmojiName];
        if (!emojiUrl) {
            return null;
        } else if (emojiUrl.substring(0, ALIAS_PREFIX.length) === ALIAS_PREFIX) {
            strippedEmojiName = emojiUrl.substring(ALIAS_PREFIX.length, emojiUrl.length);
            emojiUrl = null;
        }
    }
    return emojiUrl
};

export default getEmojiUrl;
