import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ColorChoice from './ColorChoice';

type Props = {
    pallette: Array<Object>,
    onChange: (color: number) => void,
    onEmojiChange: (color: number, emoji: string) => void,
};

type State = {
    selectedColor: number,
};

class ColorPicker extends React.Component<Props, State> {
    state = {
        selectedColor: 1,
    };

    onChange = (value) => {
        this.setState({
            selectedColor: value,
        });
        this.props.onChange(value);
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {this.props.pallette.map(
                            (colorData, i) => (
                                <ColorChoice
                                    key={i}
                                    color={i}
                                    displayColor={colorData.color}
                                    emoji={colorData.emoji}
                                    onClick={this.onChange}
                                    onEmojiChange={this.props.onEmojiChange}
                                />
                            )
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ColorPicker;
