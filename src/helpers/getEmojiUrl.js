const EMOJIS = require('../config/emojis.json').emoji;

const ALIAS_PREFIX = 'alias:';

const getStockEmojiUrl = (strippedEmojiName) => {
    return `https://www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/${strippedEmojiName}.png`;
}

const getEmojiUrl = (emojiName) => {
    let strippedEmojiName = emojiName.substring(1, emojiName.length - 1);
    let emojiUrl = null;
    while (!emojiUrl) {
        emojiUrl = EMOJIS[strippedEmojiName];
        if (!emojiUrl) {
            // Fallback to WebFX emojis for stock emojis.
            return getStockEmojiUrl(strippedEmojiName);
        } else if (emojiUrl.substring(0, ALIAS_PREFIX.length) === ALIAS_PREFIX) {
            strippedEmojiName = emojiUrl.substring(ALIAS_PREFIX.length, emojiUrl.length);
            emojiUrl = null;
        }
    }
    return emojiUrl
};

export default getEmojiUrl;
