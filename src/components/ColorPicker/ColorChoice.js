import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import getEmojiUrl from '../../helpers/getEmojiUrl';

type Props = {
    isSelected: boolean,
    color: number,
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
        let containerStyle = { padding: '0.5em' };
        let emojiUrl = getEmojiUrl(this.props.emoji);
        if (this.props.isSelected) {
            Object.assign(containerStyle, {
                backgroundImage: 'url(' + emojiUrl + ')',
                boxShadow: '0.25em 0.25em 0.25em #00000055',
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
                                backgroundImage: 'url(' + emojiUrl + ')',
                                backgroundSize: SIZE + 'px ' + SIZE + 'px',
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
