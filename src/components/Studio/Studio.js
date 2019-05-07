import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

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
    {
        color: null,
        emoji: ':empty:',
    },
    {
        color: '#FFFFFF',
        emoji: ':white:',
    },
    {
        color: '#000000',
        emoji: ':black:',
    },
    {
        color: '#FF0000',
        emoji: ':red:',
    },
    {
        color: '#0000FF',
        emoji: ':blue:',
    },
    {
        color: '#00FFFF',
        emoji: ':cyan:',
    },
    {
        color: '#00DD00',
        emoji: ':green:',
    },
    {
        color: '#FFFF00',
        emoji: ':yellow:',
    },
    {
        color: '#FFA500',
        emoji: ':orange:',
    },
    {
        color: '#E1C699',
        emoji: ':beige:',
    },
];

class Studio extends React.Component<Props, State> {
    encodeImage = (image) => {
        return Buffer.from(JSON.stringify(image)).toString('base64');
    };

    decodeImage = (encImage) => {
        if (!encImage) {
            return null;
        }
        return JSON.parse(Buffer.from(encImage, 'base64').toString('ascii'));
    };

    state = {
        image: this.decodeImage(this.props.savedEncImage),
        pallette: DEFAULT_PALLETTE,
        brushColor: 0,
        rightPad: false,
        showPixelGrid: true,
    };

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
        pallette[color].emoji = emoji;
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
        return window.location.origin + '/?image=' + this.encodeImage(this.state.image);
    };

    render() {
        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>Slackart</Navbar.Brand>
                </Navbar>
                <Container>
                    <Row>
                        <Col xs={3} md={3}>
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
                        </Col>
                        <Col>
                            <Canvas
                                initialImage={this.state.image}
                                pallette={this.state.pallette}
                                brushColor={this.state.brushColor}
                                onChange={this.updateEmojiText}
                                showPixelGrid={this.state.showPixelGrid}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Container style={{ padding: '0.5em' }}>
                                <Form.Control
                                    value={this.buildShareableUrl()}
                                    readOnly
                                />
                            </Container>
                            <EmojiText
                                pallette={this.state.pallette}
                                image={this.state.image}
                                rightPad={this.state.rightPad}
                            />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Studio;
