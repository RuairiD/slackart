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
    image: Array<Array<number>>,
};

class Canvas extends React.Component<Props, State> {
    constructor(props, state) {
        super(props, state);
        this.state = {
            brushDown: false,
            image: this.props.initialImage || this.buildImage(16, 16)
        };
    }

    buildImage = (width, height) => {
        let newImage = [];
        for(var x = 0; x < width; x++) {
            newImage[x] = [];
            for(var y = 0; y < height; y++) {
                let color = 0;
                if (this.state && this.state.image && this.state.image.length > x && this.state.image[x].length > y) {
                    color = this.state.image[x][y];
                }
                newImage[x][y] = color;
            }
        }

        return newImage;
    };

    buildEmptyImage = (width, height) => {
        let emptyImage = [];
        for(var x = 0; x < width; x++) {
            emptyImage[x] = [];
            for(var y = 0; y < height; y++) {
                emptyImage[x][y] = 0;
            }
        }

        return emptyImage;
    };

    clearImage = () => {
        this.setState({
            image: this.buildEmptyImage(
                this.state.image.length,
                this.state.image[0].length
            ),
        })
        this.props.onChange(this.state.image);
    };

    onPixelClick = (x, y) => {
        if (this.state.brushDown) {
            let image = this.state.image;
            image[x][y] = this.props.brushColor;
            this.setState({
                image: image,
            });
            this.props.onChange(this.state.image);
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
            image: this.buildImage(width, height),
        });
        this.props.onChange(this.state.image);
    };

    render() {
        return (
            <Container style={{ padding: '1em', 'textAlign': 'left' }}>
                <CanvasControls
                    initialWidth={this.state.image.length}
                    initialHeight={this.state.image[0].length}
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
                    {this.state.image.map((column, x) => (
                        <div key={x} style={{ display: 'inline-block' }}>
                            {this.state.image[x].map((color, y) => (
                                <CanvasPixel
                                    key={x * this.state.image.length + y}
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
