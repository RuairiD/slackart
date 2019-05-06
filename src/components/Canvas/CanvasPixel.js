import React from 'react';

type Props = {
    x: number,
    y: number,
    pallette: Array<Object>,
    color: number,
    onClick: any,
};

type State = {
};

const SIZE = 16;

class CanvasPixel extends React.Component<Props, State> {

    onClick = () => {
        this.props.onClick(this.props.x, this.props.y);
    };

    render() {
        return (
            <div
                style={{
                    background: this.props.pallette[this.props.color].color,
                    width: SIZE,
                    height: SIZE,
                }}
                onMouseOver={this.onClick}
                onMouseMove={this.onClick}
                onClick={this.onClick}
            >
            </div>
        );
    }
}

export default CanvasPixel;
