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
        this.setState({
            width: event.target.value,
        });
    };

    updateHeight = (event) => {
        this.setState({
            height: event.target.value,
        });
    };

    onResize = () => {
        this.props.onResize(this.state.width, this.state.height);
    };

    render() {
        return (
            <Container>
                <Row>
                    <Form inline>
                        <Col>
                            <Form.Control defaultValue={this.state.width} onChange={this.updateWidth} />
                        </Col>
                        <Col>
                        x
                        </Col>
                        <Col>
                        <Form.Control defaultValue={this.state.height} onChange={this.updateHeight} />
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
