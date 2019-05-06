import React from 'react';

type Props = {
    x: number,
    y: number,
    pallette: Array<number>,
    selectedColor: number,
    onClick: any,
};

type State = {
    color: number,
};

const SIZE = 16;

class CanvasPixel extends React.Component<Props, State> {
    state = {
        color: 0,
    }

    onClick = () => {
        this.setState({
            color: this.props.selectedColor,
        })
        this.props.onClick(this.props.x, this.props.y);
    };

    render() {
        return (
            <div
                style={{
                    background: this.props.pallette[this.state.color],
                    width: SIZE,
                    height: SIZE,
                }}
                onClick={this.onClick}
            >
            </div>
        );
    }
}

export default CanvasPixel;
