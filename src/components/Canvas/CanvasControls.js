import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
    initialWidth: number,
    initialHeight: number,
    onResize: (width: number, height: number) => void,
    onClear: () => void,
};

type State = {
    width: number,
    height: number,
};

class CanvasControls extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.initialWidth,
            height: this.props.initialHeight,
        }
    }

    updateWidth = (event) => {
        let width = event.target.value;
        if (width > 64) {
            width = 64;
        } else if (width < 1) {
            width = 1;
        }
        this.setState({
            width: width,
        });
    };

    updateHeight = (event) => {
        let height = event.target.value;
        if (height > 64) {
            height = 64;
        } else if (height < 1) {
            height = 1;
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
