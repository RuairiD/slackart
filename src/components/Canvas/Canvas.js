import React from 'react';

import Container from 'react-bootstrap/Container';

import CanvasControls from './CanvasControls';
import CanvasPixel from './CanvasPixel';

type Props = {
    pallette: Array<Object>,
    brushColor: number,
    onChange: (image: Array<Array<number>>) => void,
};

type State = {
    width: number,
    height: number,
    newWidth: number,
    newHeight: number,
    brushDown: boolean,
};

class Canvas extends React.Component<Props, State> {
    state = {
        width: 16,
        height: 16,
        brushDown: false,
    }

    constructor(props, state) {
        super(props, state);
        this.image = this.buildImage()
    }

    buildImage = () => {
        let newImage = [];
        for(var x = 0; x < this.state.width; x++) {
            newImage[x] = [];
            for(var y = 0; y < this.state.height; y++) {
                let color = 0;
                if (this.image && this.image.length > x && this.image[x].length > y) {
                    color = this.image[x][y];
                }
                newImage[x][y] = color;
            }
        }

        return newImage;
    };

    clearImage = () => {
        for(var x = 0; x < this.state.width; x++) {
            for(var y = 0; y < this.state.height; y++) {
                this.image[x][y] = 0;
            }
        }
        this.props.onChange(this.image);
    };

    onPixelClick = (x, y) => {
        if (this.state.brushDown) {
            this.image[x][y] = this.props.brushColor;
            this.props.onChange(this.image);
        }
    };

    onMouseDown = () => {
        this.setState({
            brushDown: true,
        })
    };

    onMouseUp= () => {
        this.setState({
            brushDown: false,
        })
    };

    onResize = (width, height) => {
        this.setState({
            width: width,
            height: height,
        });
        this.image = this.buildImage();
        this.props.onChange(this.image);
    };

    render() {
        return (
            <Container style={{ padding: '1em', 'textAlign': 'left' }}>
                <CanvasControls
                    onResize={this.onResize}
                    onClear={this.clearImage}
                />
                <div
                    style={{
                        display: 'inline-block',
                        borderStyle: 'solid',
                        borderColor: '#000000',
                        backgroundColor: '#EEEEEE'
                    }}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseLeave={this.onMouseUp}
                >
                    {this.image.map((column, x) => (
                        <div key={x} style={{ display: 'inline-block' }}>
                            {this.image[x].map((color, y) => (
                                <CanvasPixel
                                    key={x * this.image.length + y}
                                    x={x}
                                    y={y}
                                    pallette={this.props.pallette}
                                    color={color}
                                    onClick={this.onPixelClick}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Container>
        );
    }
}

export default Canvas;
