import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

type Props = {
    isSelected: boolean,
    color: number,
    displayColor: string,
    emoji: string,
    onClick: any,
    onEmojiChange: any,
};

type State = {
};

const SIZE = 32;

class ColorChoice extends React.Component<Props, State> {

    onClick = () => {
        this.props.onClick(this.props.color);
    };

    onChange = (event) => {
        this.props.onEmojiChange(this.props.color, event.target.value);
    };

    render() {
        let containerStyle = { padding: '0.25em' };
        if (this.props.isSelected) {
            Object.assign(containerStyle, {
                borderStyle: 'dotted',
                borderColor: '#000000',
            })
        }
        return (
            <Container style={containerStyle}>
                <Row>
                    <Col md="auto">
                        <Form.Control value={this.props.emoji} onChange={this.onChange} style={{ width: '6em' }} />
                    </Col>
                    <Col xs>
                        <div
                            style={{
                                background: this.props.displayColor,
                                borderStyle: 'solid',
                                borderColor: '#000000',
                                width: SIZE,
                                height: SIZE,
                            }}
                            onClick={this.onClick}
                        >
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ColorChoice;