import React from 'react';

import CanvasPixel from './CanvasPixel';

type Props = {
    width: number,
    height: number,
    pallette: Array<number>,
};

type State = {
    selectedColor: number,
    image: Array<Array<number>>,
};

class Canvas extends React.Component<Props, State> {
    state = {
        selectedColor: 1,
        image: null,
    };

    constructor(props, state) {
        super(props, state);
        this.state = {
            selectedColor: 1,
            image: this.buildImage(),
        };
    }

    componentDidUpdate() {
        this.setState({
            image: this.buildImage(),
        });
    }

    buildImage = () => {
        let newImage = [];
        for(var y = 0; y < this.props.height; y++) {
            newImage[y] = [];
            for(var x = 0; x < this.props.width; x++) {
                let color = 0;
                if (this.state.image && this.state.image.length > y && this.state.image[y].length > x) {
                    color = this.state.image[y][x];
                }
                newImage[y][x] = color;
            }
        }

        return newImage;
    }

    onPixelClick = (x, y) => {
        this.state.image[y][x] = this.state.selectedColor;
    };

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                {this.state.image.map((color, y) => (
                    <div style={{ display: 'inline-block' }}>
                        {this.state.image[y].map((color, x) => (
                            <CanvasPixel x={x} y={y} pallette={this.props.pallette} selectedColor={this.state.selectedColor} onClick={this.onPixelClick} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Canvas;
