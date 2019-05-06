import React from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

type Props = {
    image: Array<Array<number>>,
    pallette: Array<Object>,
};

type State = {
};

class EmojiText extends React.Component<Props, State> {
    toEmojiText = (image) => {
        let text = ':empty:\n';
        if (image.length === 0) { 
            return text;
        }
        for (var x = 0; x < image[0].length; x++) {
            for (var y = 0; y < image.length; y++) {
                text = text + ':' + this.props.pallette[image[y][x]].emoji + ':';
            }
            text = text + '\n';
        }
        return text;
    };

    render() {
        return (
            <Container>
                <Form.Control as="textarea" rows="16" value={this.toEmojiText(this.props.image)} readOnly />
            </Container>
        );
    }
}

export default EmojiText;
