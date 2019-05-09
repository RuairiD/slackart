import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import Settings from './Settings';
import Canvas from '../Canvas/Canvas';
import ColorPicker from '../ColorPicker/ColorPicker';
import EmojiText from '../EmojiText/EmojiText';

type Props = {
    savedEncImage: string,
};

type State = {
    image: Array<Array<number>>,
    pallette: Array<Object>,
    brushColor: number,
    rightPad: boolean,
    showPixelGrid: boolean,
};

const DEFAULT_PALLETTE = [
    ':empty:',
    ':white:',
    ':black:',
    ':red:',
    ':blue:',
    ':cyan:',
    ':green:',
    ':yellow:',
    ':orange:',
    ':beige:',
    ':gold:',
    ':navy_blue:',
];

const ROOT = 'https://people.yelpcorp.com/~ruairi/slackart';

class Studio extends React.Component<Props, State> {
    encodeImageData = (imageData) => {
        return Buffer.from(JSON.stringify(imageData)).toString('base64');
    };

    decodeImageData = (encImageData) => {
        if (!encImageData) {
            return {
                image: null,
                pallette: null,
            };
        }
        return JSON.parse(Buffer.from(encImageData, 'base64').toString('ascii'));
    };

    constructor(props) {
        super(props);
        const imageData = this.decodeImageData(this.props.savedEncImage);
        this.state = {
            image: imageData.image,
            pallette: imageData.pallette || DEFAULT_PALLETTE,
            brushColor: 0,
            rightPad: false,
            showPixelGrid: true,
        }
    }

    updateEmojiText = (image) => {
        this.setState({
            image: image,
        });
    };

    updateBrushColor = (color) => {
        this.setState({
            brushColor: color,
        });
    };

    updateColorEmoji = (color, emoji) => {
        let pallette = this.state.pallette;
        pallette[color] = emoji;
        this.setState({
            pallette: pallette,
        });
    };

    toggleRightPad = () => {
        this.setState({
            rightPad: !this.state.rightPad,
        });
    };

    toggleShowPixelGrid = () => {
        this.setState({
            showPixelGrid: !this.state.showPixelGrid,
        });
    };

    buildShareableUrl = () => {
        return ROOT + '/?image=' + this.encodeImageData({
            image: this.state.image,
            pallette: this.state.pallette,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Slackart</Navbar.Brand>
                </Navbar>
                <Container style={{ textAlign: 'left' }}>
                    <Row>
                        <Col xs={3} md={3}>
                            <Card className="island">
                                <ColorPicker
                                    pallette={this.state.pallette}
                                    onChange={this.updateBrushColor}
                                    onEmojiChange={this.updateColorEmoji}
                                />
                                <Settings
                                    rightPad={this.state.rightPad}
                                    showPixelGrid={this.state.showPixelGrid}
                                    toggleRightPad={this.toggleRightPad}
                                    toggleShowPixelGrid={this.toggleShowPixelGrid}
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card className="island">
                                <Canvas
                                    initialImage={this.state.image}
                                    pallette={this.state.pallette}
                                    brushColor={this.state.brushColor}
                                    onChange={this.updateEmojiText}
                                    showPixelGrid={this.state.showPixelGrid}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="island">
                                <Form.Label>Shareable URL</Form.Label>
                                <Form.Control
                                    value={this.buildShareableUrl()}
                                    readOnly
                                    style={{ marginBottom: '0.5em' }}
                                />
                                <EmojiText
                                    pallette={this.state.pallette}
                                    image={this.state.image}
                                    rightPad={this.state.rightPad}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Studio;
