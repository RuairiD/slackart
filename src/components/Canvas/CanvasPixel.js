import React from 'react';

import getEmojiUrl from '../../helpers/getEmojiUrl';

type Props = {
    x: number,
    y: number,
    pallette: Array<Object>,
    color: number,
    onClick: any,
    showPixelGrid: boolean,
};

type State = {
};

const SIZE = 16;

class CanvasPixel extends React.Component<Props, State> {

    onClick = () => {
        this.props.onClick(this.props.x, this.props.y);
    };

    render() {
        let pixelStyle = {
            width: SIZE,
            height: SIZE,
        };

        let emoji = this.props.pallette[this.props.color];
        let emojiUrl = getEmojiUrl(emoji);

        if (emojiUrl) {
            Object.assign(pixelStyle, {
                backgroundImage: 'url(' + emojiUrl + ')',
                backgroundSize: SIZE + 'px ' + SIZE + 'px',
            });
        }

        if (this.props.showPixelGrid) {
            Object.assign(pixelStyle, {
                borderStyle: 'dashed',
                borderColor: '#00000066',
                borderWidth: '1px',
            })
        }

        return (
            <div
                style={pixelStyle}
                onMouseOver={this.onClick}
                onMouseMove={this.onClick}
                onClick={this.onClick}
            >
            </div>
        );
    }
}

export default CanvasPixel;
