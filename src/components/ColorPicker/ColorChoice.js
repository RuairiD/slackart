import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

type Props = {
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
        return (
            <Container>
                <Row>
                    <Col md="auto">
                        <Form.Control defaultValue={this.props.emoji} onChange={this.onChange} />
                    </Col>
                    <Col md="auto">
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
