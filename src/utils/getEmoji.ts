import _ from 'lodash';

function getEmoji() {
    return _.sample(['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😗', '🥰', '😘', '😍', '😎', '😋', '😊', '😉', '😙', '😚']);
}

export default getEmoji;