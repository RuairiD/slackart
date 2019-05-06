import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
    onResize: (width: number, height: number) => void,
    onClear: () => void,
};

type State = {
    width: number,
    height: number,
};

class CanvasControls extends React.Component<Props, State> {
    state = {
        width: 16,
        height: 16,
    };

    updateWidth = (event) => {
        let width = event.target.value;
        if (width > 64) {
            width = 64;
        }
        this.setState({
            width: width,
        });
    };

    updateHeight = (event) => {
        let height = event.target.value;
        if (height > 64) {
            height = 64;
        }
        this.setState({
            height: height,
        });
    };

    onResize = () => {
        this.props.onResize(this.state.width, this.state.height);
    };

    render() {
        return (
            <Container style={{ padding: '1em' }}>
                <Row>
                    <Form inline>
                        <Col>
                            <Form.Control value={this.state.width} onChange={this.updateWidth} style={{ width: '3em' }} />
                        </Col>
                        <Col>
                            x
                        </Col>
                        <Col>
                            <Form.Control value={this.state.height} onChange={this.updateHeight} style={{ width: '3em' }} />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={this.onResize}>
                                Resize
                            </Button>
                        </Col>
                    </Form>
                    <Col>
                        <Button
                            variant="danger"
                            onClick={this.props.onClear}
                        >
                            Clear Canvas
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CanvasControls;
