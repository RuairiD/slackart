import React from 'react';

import Container from 'react-bootstrap/Container';

import CanvasControls from './CanvasControls';
import CanvasPixel from './CanvasPixel';

type Props = {
    initialImage: Array<Array<number>>,
    pallette: Array<Object>,
    brushColor: number,
    onChange: (image: Array<Array<number>>) => void,
    showPixelGrid: boolean,
};

type State = {
    brushDown: boolean,
    // TODO: this is a hack used exclusively to force a re-render on onResize. I'm bad at React.
    updates: number,
};

class Canvas extends React.Component<Props, State> {
    state = {
        brushDown: false,
        updates: 0,
    }

    constructor(props, state) {
        super(props, state);
        this.image = this.props.initialImage || this.buildImage(16, 16)
    }

    buildImage = (width, height) => {
        let newImage = [];
        for(var x = 0; x < width; x++) {
            newImage[x] = [];
            for(var y = 0; y < height; y++) {
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
        for(var x = 0; x < this.image.length; x++) {
            for(var y = 0; y < this.image[x].length; y++) {
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
        this.image = this.buildImage(width, height);
        this.props.onChange(this.image);
        this.setState({
            updates: this.state.updates + 1,
        })
    };

    render() {
        return (
            <Container style={{ padding: '1em', 'textAlign': 'left' }}>
                <CanvasControls
                    initialWidth={this.image.length}
                    initialHeight={this.image[0].length}
                    onResize={this.onResize}
                    onClear={this.clearImage}
                />
                <div
                    style={{
                        display: 'inline-block',
                        borderStyle: 'solid',
                        borderColor: '#000000',
                        backgroundColor: '#EEEEEE',
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
                                    showPixelGrid={this.props.showPixelGrid}
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
