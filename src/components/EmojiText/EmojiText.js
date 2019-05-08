import React from 'react';

import Form from 'react-bootstrap/Form';

type Props = {
    image: Array<Array<number>>,
    pallette: Array<Object>,
    /* Append :empty: emojis to the right of each line if true. */
    rightPad: boolean,
};

type State = {
};

class EmojiText extends React.Component<Props, State> {
    toEmojiText = (image) => {
        let text = ':empty:\n';
        if (!image || image.length === 0) { 
            return text;
        }
        for (var x = 0; x < image[0].length; x++) {
            let textBuffer = '';
            let emptyLine = true;
            for (var y = 0; y < image.length; y++) {
                // Maintain buffer of empty emojis; only flush them to text if we
                // encounter another non-empty emoji, indicating they aren't the
                // last emojis of the line (unless rightPad is true).
                if (!this.props.rightPad && image[y][x] === 0) {
                    textBuffer = textBuffer + this.props.pallette[image[y][x]].emoji
                } else {
                    text = text + textBuffer + this.props.pallette[image[y][x]].emoji;
                    textBuffer = '';
                    emptyLine = false;
                }
            }
            // Empty lines should consist of a single :empty: emoji; slack will not reproduce
            // empty lines at full height.
            if (emptyLine) {
                text = text + this.props.pallette[0].emoji
            }
            text = text + '\n';
        }

        return text;
    };

    render() {
        return (
            <React.Fragment>
                <Form.Label>Slack Text</Form.Label>
                <Form.Control as="textarea" rows="16" value={this.toEmojiText(this.props.image)} readOnly />
            </React.Fragment>
        );
    }
}

export default EmojiText;
