import React from 'react';

type Props = {
    x: number,
    y: number,
    selectedColor: string,
    onClick: any,
};

type State = {
    color: string,
}

const SIZE = 16;

class CanvasPixel extends React.Component<Props, State> {
    state = {
        color: '#FF0000',
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
                    background: this.state.color,
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
